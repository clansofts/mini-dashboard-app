import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from "firebase";

import { FirebaseAuthService } from './firebase-auth.service';

import { IUser } from '../../shared/interface/user';
import { User } from '../../shared/model/user.model';


@Injectable()
export class FirebaseDbService {

  users: AngularFireList<any>;
  posts: AngularFireList<any>;
  uploads: AngularFireList<any>;

  constructor(private router: Router, private db: AngularFireDatabase, private firebaseAuthService: FirebaseAuthService) {
    this.users = db.list<any>('app-users');
    this.posts = db.list<any>('app-posts');
    this.uploads = db.list<any>('app-uploads');
  }

  newUser(user: IUser) {
    this.firebaseAuthService.signUpWithEmailAndPassword(user.email, user.password)
      .then((authState) => {

        const uid = authState['uid'];
        const newUser = new User(user.firstname, user.lastname, user.phonenumber, user.gender, user.email, user.password, uid);

        this.users.push(newUser);

        this.router.navigate(['dashboard']);

      }).catch((e) => 0)
  }

  get userInfo() {
    return this.users.snapshotChanges().map((changes) => {
      return changes.map((el) => {
        const uid = this.firebaseAuthService.uid;
        return el.payload.val().uid === uid ? { key: el.payload.key, ...el.payload.val() } : null;
      }).reverse().filter(el => el !== null)[0];
    });
  }

  getUserInfo(uid: string) {
    return this.users.snapshotChanges().map((changes) => {
      return changes.map((el) => {
        return el.payload.val().uid === uid ? { key: el.payload.key, ...el.payload.val() } : null;
      }).reverse().filter(el => el !== undefined)[0];
    });
  }

  readPublicPosts() {
    return this.posts.snapshotChanges().map((changes) => {
      return changes
        .map((el) => ({ key: el.payload.key, ...el.payload.val() }))
        .reverse()
        .map((post) => {
          this.users.snapshotChanges().map((changes) => {
            return changes.map((user) => {
              return user.payload.val().uid === post.uid ? { key: user.payload.key, ...user.payload.val() } : null;
            }).reverse().filter(e => e !== null)[0];
          }).subscribe((response) => {
            post['user'] = response;
          });
          return post;
        });
    });
  }

  readPrivatePosts() {
    return this.posts.snapshotChanges().map((changes) => {
      return changes
        .map((el) => ({ key: el.payload.key, ...el.payload.val() }))
        .reverse()
        .map((post) => {
          this.users.snapshotChanges().map((changes) => {
            return changes.map((user) => {
              return user.payload.val().uid === post.uid ? { key: user.payload.key, ...user.payload.val() } : null;
            }).reverse().filter(e => e !== null)[0];
          }).subscribe((response) => {
            post['user'] = response;
          });
          return post;
        })
        .filter((post) => post.uid === this.firebaseAuthService.uid ? post : 0);
    });
  }

  readPublicAlbum() {
    return this.uploads.snapshotChanges().map((changes) => {
       return changes.map((el) => ({ key: el.payload.key, ...el.payload.val() })).reverse();
    });
  }

  readPrivateAlbum() {
    return this.uploads.snapshotChanges().map((changes) => {
      return changes.map((el) => {
        const uid = this.firebaseAuthService.uid;
        return el.payload.val().uid === uid ? { key: el.payload.key, ...el.payload.val() } : null;
      }).reverse().filter(el => el !== null);
    })
  }

  removeFile(file: any) {
    this.removeFileDB(file.key).then(() => {
      this.removeFileStorage(file.fileName);
    })
  }

  removePost(key: string) {
    this.posts.remove(key);
  }

  private removeFileDB(key: string) {
    return this.uploads.remove(key);
  }

  private removeFileStorage(name: string) {
    const storage = firebase.storage().ref();
    return storage.child(`app-uploads/${name}`).delete()
  }

}
