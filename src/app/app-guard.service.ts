import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AppGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const promise = new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe( (auth) => {
        resolve(auth);
      });
    });

    return promise.then((auth) => {
      if (auth !== null) {
        this.router.navigate(['dashboard']);
      } else {
        return true;
      }
    });

  }

}
