import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { User } from '../shared/user';

@Injectable()
export class AuthService {

  private user: User;
  private authState: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser() {
    const uid = this.currentUserId;
    return this.db.object(`users/${uid}`);
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState['uid'] : '';
  }

  set setUser(user: User) {
    this.user = user;
  }

  signUpUser(email: string, password: string): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((authState: any) => {
        this.newUser(this.user);
        this.router.navigate(['dashboard'])
      }).catch((e) => {
        console.log(e);
      });
  }

  signInUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInUserFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }

  signInUserTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }

  signInUserGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }

  signOutUser(): void {
    this.afAuth.auth.signOut().then((auth) => {
      this.router.navigate(['/'])
    }).catch((e) => {
      console.log(e);
    });
  }


  private newUser(user: User): void {
    // const uid = this.currentUserId;
    const uid = this.afAuth.auth.currentUser['uid'];

    this.db.object(`users/${uid}`)
      .update(user)
      .catch((e) => {
        console.log(e);
      })
  }

}
