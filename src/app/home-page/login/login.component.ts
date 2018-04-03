import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { FirebaseAuthService } from '../../common/core/services/firebase-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  authState: Subscription;
  isClicked: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private afAuth: AngularFireAuth, private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null),
    });
  }

  ngOnDestroy() {
    if (!this.isClicked) {
      this.authState.unsubscribe();
    }
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isClicked = true;

    this.firebaseAuthService.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.router.navigate(['dashboard']);
      }).catch((e) => {
        this.router.navigate(['/']);
        console.log(e.message);
      });
    this.loginForm.reset();
  }

  logout() {
    this.firebaseAuthService.signOut()
  }

  onSignIn() {
    this.authState = this.afAuth.authState.subscribe((state) => {
      state !== null ? this.router.navigate(['dashboard']) : this.router.navigate(['/']);
    });
  }

  onSocialSignIn(account: string) {
    if (account === 'facebook')   this.firebaseAuthService.signInWithFacebook();
    if (account === 'twitter')    this.firebaseAuthService.signInWithTwitter();
    if (account === 'google')     this.firebaseAuthService.signInWithGoogle();
    if (account === 'github')     this.firebaseAuthService.signInWithGithub();
    if (account === 'anonymous')  this.firebaseAuthService.signInAnonymously();
  }

  onCreateAccount() {
    this.isClicked = true;
    this.router.navigate(['registration'], { relativeTo: this.route })
  }

}
