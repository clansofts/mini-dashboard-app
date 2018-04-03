import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class HomePageGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const promise = new Promise(
      (resolve, reject) => {
        this.afAuth.authState.subscribe( (state: any) => {
          resolve(state !== null);
        });
      });

    return promise.then((data: boolean) => {
      data ? this.router.navigate(['dashboard']) : 0;
      return data ? false : true;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
