import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as fb from 'firebase';

const LINK = 'https://www.isc.upenn.edu/how-to/configuring-your-web-browser-allow-pop-windows';


@Injectable()
export class FirebaseAuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.authState.subscribe((authState) => {
      console.log(authState);
      authState !== null ? 0 : this.router.navigate(['/']);
    });
  }

  get isAuthenticated(): Observable<any> {
    const authnticated = this.afAuth.authState;
    return authnticated;
  }

  get isAnonymous(): boolean {
    const anonymous = this.afAuth.auth.currentUser.isAnonymous;
    return anonymous;
  }

  get uid(): string {
    let currentUser = this.afAuth.auth.currentUser;
    return currentUser !== null ? this.afAuth.auth.currentUser.uid : 'uninitialized';
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithFacebook() {
    const faceabook = new fb.auth.FacebookAuthProvider;
    return this.onSocialSignIn(faceabook);
  }

  signInWithTwitter() {
    const faceabook = new fb.auth.TwitterAuthProvider;
    return this.onSocialSignIn(faceabook);
  }

  signInWithGoogle() {
    const faceabook = new fb.auth.GoogleAuthProvider;
    return this.onSocialSignIn(faceabook);
  }

  signInWithGithub() {
    const faceabook = new fb.auth.GithubAuthProvider;
    return this.onSocialSignIn(faceabook);
  }

  signInAnonymously() {
    return this.afAuth.auth.signInAnonymously()
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }


  // helper functions
  private onSocialSignIn(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

}
