import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FirebaseAuthService } from '../../common/core/services/firebase-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null),
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.firebaseAuthService.signInWithEmailAndPassword(email, password);
    this.loginForm.reset();
  }

  logout() {
    this.firebaseAuthService.signOut()
  }

  onSocialSignIn(account: string) {
    if (account === 'facebook')   this.firebaseAuthService.signInWithFacebook();
    if (account === 'twitter')    this.firebaseAuthService.signInWithTwitter();
    if (account === 'google')     this.firebaseAuthService.signInWithGoogle();
    if (account === 'github')     this.firebaseAuthService.signInWithGithub();
    if (account === 'anonymous')  this.firebaseAuthService.signInAnonymously();
  }

  onCreateAccount() {
    this.router.navigate(['registration'], { relativeTo: this.route })
  }

}
