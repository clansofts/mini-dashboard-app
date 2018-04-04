import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { FirebaseAuthService } from '../../common/core/services/firebase-auth.service';
import { SharedService } from '../../common/core/services/shared.service';

import { Snackbar } from '../../common/shared/model/snackbar.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  authState: Subscription;
  isClicked: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private afAuth: AngularFireAuth, private firebaseAuthService: FirebaseAuthService, private sharedService: SharedService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'password': new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    });
  }

  ngOnDestroy() {
    if (!this.isClicked) {
      this.authState.unsubscribe();
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isClicked = true;
    this.isLoading = true;

    this.firebaseAuthService.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.router.navigate(['dashboard']);
      }).catch((e) => {
        this.sharedService.openSnackbar(new Snackbar(e.message, 5000));
        this.router.navigate(['/']);
        this.loginForm.reset();
      });
  }

  logout() {
    this.firebaseAuthService.signOut()
  }

  onSignIn() {
    this.isLoading = true;
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
