import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DashboardGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const promise = new Promise(
      (resolve, reject) => {
        this.afAuth.authState.subscribe( (state: any) => resolve(state !== null));
      });

    return promise.then((data: boolean) => data ? true : false);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
