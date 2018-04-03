import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class UserResolver implements Resolve<any> {

  constructor(private afAuth: AngularFireAuth) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const promise = new Promise(
      (resolve, reject) => {
        this.afAuth.authState.subscribe((response) => {
          const providerData = response.providerData[0];
          resolve(providerData !== undefined ? providerData : false);
        });
      }
    );

    return promise.then(e => e);
  }

}
