import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private afAuth: AngularFireAuth, private authService: AuthService) { }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  ngOnInit() {
  }

  onDashboard() {
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  onProfile() {
    this.router.navigate(['dashboard', 'profile'], { relativeTo: this.route });
  }

  onAlbum() {
    this.router.navigate(['dashboard', 'album'], { relativeTo: this.route });
  }

  onHeader() {
    this.router.navigate(['/'])
  }

  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route });
  }

  onLogin() {
    this.router.navigate(['login'], { relativeTo: this.route });
  }

  onSignout() {
    this.authService.signOutUser();
  }

}
