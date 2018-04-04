import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FirebaseDbService } from '../../../common/core/services/firebase-db.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  photo: string;

  constructor(private route: ActivatedRoute, private firebaseDbService: FirebaseDbService) { }

  ngOnInit() {
    this.user = null;
    const user = this.firebaseDbService.userInfo;
    this.route.data.subscribe((response) => {
      if (response[0].providerId === 'password') {
        user.subscribe((response) => {
          this.user = response;
          this.photo = `https://api.adorable.io/avatars/${response.firstname + response.lastname}`;
        });
      } else if (!response[0]) {
        this.user = {
          displayName: 'Anonymous User',
          email: 'Anonymous User'
        };
        this.photo = `https://api.adorable.io/avatars/${this.user.displayName}`;
      } else {
        this.user = response[0];
        this.photo = this.user.photoURL;
      }

    });
  }

}
