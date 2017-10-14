import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // const auth = this.afAuth.auth.currentUser !== null;
    //
    // if (auth) {
    //   return this.afAuth.auth.currentUser !== null;
    // } else {
    //   this.router.navigate(['/']);
    // }

    const promise = new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe( (state: any) => {
        resolve(state);
      })
    })

    return promise.then((auth: boolean) => {
      if (auth) {
        return auth !== null;
      } else {
        this.router.navigate(['/']);
      }
    })

  }

}