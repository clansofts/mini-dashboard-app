import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FirebaseDbService } from '../../common/core/services/firebase-db.service';

import { User } from '../../common/shared/model/user.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private firebaseDbService: FirebaseDbService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'firstname': new FormControl(),
      'lastname': new FormControl(),
      'phonenumber': new FormControl(),
      'gender': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    })
  }

  onSubmit() {
    const firstname = this.registrationForm.value['firstname'];
    const lastname = this.registrationForm.value['lastname'];
    const phonenumber = this.registrationForm.value['phonenumber'];
    const gender = this.registrationForm.value['gender'];
    const email = this.registrationForm.value['email'];
    const password = this.registrationForm.value['password'];

    const user = new User(firstname, lastname, String(phonenumber), gender, email, password);

    this.firebaseDbService.newUser(user);
  }

}
