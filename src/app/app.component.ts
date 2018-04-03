import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { OnSignoutComponent } from './common/shared/components/on-signout/on-signout.component';

import { FirebaseAuthService } from './common/core/services/firebase-auth.service';
import { FirebaseDbService } from './common/core/services/firebase-db.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  isAuthenticated: boolean = false
  onSignoutComponentRef: MatDialogRef<OnSignoutComponent>;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private firebaseAuthService: FirebaseAuthService, private firebaseDbService: FirebaseDbService) {}

  ngAfterViewInit() {
    this.isAuthenticated = false;

    this.firebaseAuthService.isAuthenticated.subscribe((response) => {
      this.isAuthenticated = response !== null;
    });
  }

  main() {
    this.isAuthenticated
      ? this.router.navigate(['dashboard'])
      : this.router.navigate(['/']);
  }

  onDashboard() {
    this.router.navigate(['dashboard']);
  }

  onProfile() {
    this.router.navigate(['dashboard', 'profile']);
  }

  onUploads() {
    this.router.navigate(['dashboard', 'uploads']);
  }

  click() {
    console.log('putang ina');
  }

  onSignOut() {
    this.onSignoutComponentRef = this.dialog.open(OnSignoutComponent);
    this.onSignoutComponentRef.afterClosed().subscribe((response) => {
      if (response) {
        this.router.navigate(['/']);
        setTimeout(() => {
          this.firebaseAuthService.signOut();
        }, 1000);
      }
    });
  }

}
