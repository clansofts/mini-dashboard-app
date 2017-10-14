import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  tags: string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
      'fullName': new FormControl(null, [ Validators.required ]),
      'gender': new FormControl(null, [ Validators.required]),
      'tags': new FormControl(null),
    });

    this.email = this.registerForm.controls.email;
    this.password = this.registerForm.controls.password;
  }

  onAddTag() {
    const tag = this.registerForm.get('tags').value;
    this.tags.push(tag);

    this.registerForm.patchValue({
      'tags': ''
    });
  }

  onRemoveTag(index: number) {
    this.tags.splice(index, 1);

    this.registerForm.patchValue({
      'tags': ''
    });
  }

  onSocialSignup(option: string) {
    if (option === 'facebook' && this.registerForm.valid) {
      this.authService.signInUserFacebook();
    } else if (option === 'twitter' && this.registerForm.valid) {
      this.authService.signInUserTwitter();
    } else if (option === 'github' && this.registerForm.valid) {
      this.authService.signInUserGithub();
    }
  }

  onSubmit() {
    const email = this.email.value;
    const password = this.password.value;

    this.registerForm.value['tags'] = this.tags;

    console.log('sumbitted');
    if (this.registerForm.valid) {
      console.log('valid');
      // this.authService.setUser = this.registerForm.value;
      // this.authService.signUpUser(email, password);
    }
  }

}
