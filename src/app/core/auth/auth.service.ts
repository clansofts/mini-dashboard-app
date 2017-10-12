import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

import { User } from '../shared/user';

@Injectable()
export class AuthService {

  private user: User;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

  get isAuthenticated(): boolean {
    return this.afAuth.auth.currentUser !== null;
  }

  get currentUser() {
    const uid = this.currentUserId;
    return this.db.object(`users/${uid}`);
  }

  get currentUserId(): string {
    const authState = this.afAuth.auth.currentUser;
    return this.isAuthenticated ? authState['uid'] : '';
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

  signOutUser(): void {
    this.afAuth.auth.signOut().then((auth) => {
      this.router.navigate(['/'])
    }).catch((e) => {
      console.log(e);
    });
  }


  private newUser(user: User): void {
    const uid = this.currentUserId;

    this.db.object(`users/${uid}`)
      .update(user)
      .catch((e) => {
        console.log(e);
      })
  }

}
