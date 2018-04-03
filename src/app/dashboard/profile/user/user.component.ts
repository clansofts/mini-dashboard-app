import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { FirebaseDbService } from '../../../common/core/services/firebase-db.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;

  constructor(private route: ActivatedRoute, private afAuth: AngularFireAuth, private firebaseDbService: FirebaseDbService) { }

  ngOnInit() {
    this.user = null;
    const user = this.firebaseDbService.userInfo;
    this.route.data.subscribe((response) => {

      if (response[0].providerId === 'password') {
        user.subscribe((response) => {
          this.user = response;
        });
      } else if (!response[0]) {
        this.user = {
          displayName: 'Anonymous User',
          email: 'Anonymous User'
        };
      } else {
        this.user = response[0];
      }

    });
  }

}
