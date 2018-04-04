import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseDbService } from '../../common/core/services/firebase-db.service';
import { SharedService } from '../../common/core/services/shared.service';

import { User } from '../../common/shared/model/user.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private firebaseDbService: FirebaseDbService, private sharedService: SharedService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'firstname': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(this.sharedService.namePattern)]),
      'lastname': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(this.sharedService.namePattern)]),
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    })
  }

  onSubmit() {
    if (this.registrationForm.invalid) return;

    const firstname = this.registrationForm.value['firstname'];
    const lastname = this.registrationForm.value['lastname'];
    const phonenumber = '';
    const gender = '';
    const email = this.registrationForm.value['email'];
    const password = this.registrationForm.value['password'];

    const user = new User(firstname, lastname, String(phonenumber), gender, email, password);

    this.firebaseDbService.newUser(user);
  }

}
