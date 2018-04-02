import { Injectable } from '@angular/core';
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

  constructor(private db: AngularFireDatabase, private firebaseAuthService: FirebaseAuthService) {
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

      }).catch((e) => {

        console.log('ERROR: ', e);

      })
  }

  get userInfo() {
    return this.users.snapshotChanges().map((changes) => {
      return changes.map((el) => {
        const uid = this.firebaseAuthService.uid;
        return el.payload.val().uid === uid ? { key: el.payload.key, ...el.payload.val() } : null;
      }).reverse().filter(el => el !== undefined)[0];
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
      return changes.map((el) => ({ key: el.payload.key, ...el.payload.val() })).reverse();
    });
  }

  readPrivatePosts() {
    return this.posts.snapshotChanges().map((changes) => {
      return changes.map((el) => {
        const uid = this.firebaseAuthService.uid;
        return el.payload.val().uid === uid ? { key: el.payload.key, ...el.payload.val() } : null;
      }).reverse().filter(el => el !== undefined);
    })
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
      }).reverse().filter(el => el !== undefined);
    })
  }

  removeFile(file: any) {
    this.removeFileDB(file.key).then(() => {
      this.removeFileStorage(file.fileName);
    })
  }


  private removeFileDB(key: string) {
    return this.uploads.remove(key);
  }

  private removeFileStorage(name: string) {
    const storage = firebase.storage().ref();
    return storage.child(`app-uploads/${name}`).delete()
  }

}
