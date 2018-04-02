import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { OnSignoutComponent } from './common/shared/components/on-signout/on-signout.component';

import { FirebaseAuthService } from './common/core/services/firebase-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  onSignoutComponentRef: MatDialogRef<OnSignoutComponent>;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private firebaseAuthService: FirebaseAuthService) {}

  main() {
    this.router.navigate(['/']);
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

  onSignOut() {
    this.onSignoutComponentRef = this.dialog.open(OnSignoutComponent);
    this.onSignoutComponentRef.afterClosed().subscribe((response) => {
      response ? this.firebaseAuthService.signOut().then(() => {
        console.log('signed-out successfully');
      }) : 0;
    });
  }

}
