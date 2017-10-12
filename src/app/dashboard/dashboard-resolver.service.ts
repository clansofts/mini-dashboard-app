import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthService } from '../core/auth/auth.service';

import { User } from '../core/shared/user';


@Injectable()
export class DashboardResolver implements Resolve<any> {

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const promise = new Promise((resolve, reject) => {
      this.authService.currentUser.valueChanges().take(1).delay(50).subscribe((data: any) => {
        return resolve(data);
      })
    });

    return promise.then((user: any) => {
      return user;
    });
  }

}
