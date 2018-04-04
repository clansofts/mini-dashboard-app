import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fb from 'firebase';

import { FirebaseAuthService } from '../../services/firebase-auth.service';


@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.scss']
})
export class BufferComponent implements OnInit {

  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {

    // fb.app().database().goOffline()

    this.firebaseAuthService.signOut()
      .then(() => this.router.navigate(['/']))

  }

}
