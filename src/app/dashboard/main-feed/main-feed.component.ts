import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from '../../common/core/services/firebase-auth.service';


@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }

}
