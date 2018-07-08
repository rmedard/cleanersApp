import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../+services/auth.service';
import * as _ from 'underscore';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      const loggedInUser = this.authService.getLoggedInUser();
      console.log(loggedInUser);
      if (_.contains(loggedInUser.roles, 'Admin')) {
        return true;
      } else {
        this.router.navigate(['/profile']);
      }
    }
    this.router.navigate(['/login']).then(data => {
      console.log('redirected: ' + data);
    });
    return false;
  }
}
