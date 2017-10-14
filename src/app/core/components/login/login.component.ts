import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    });

    this.email = this.loginForm.controls.email;
    this.password = this.loginForm.controls.password;
  }

  onSubmit() {
    const email = this.email.value;
    const password = this.password.value;

    if (this.loginForm.valid) {
      this.authService.signInUser(email, password)
        .then((authState: any) => {
          this.router.navigate(['dashboard'])
        }).catch((e) => {
          console.log(e);
        });
    }
  }

}
