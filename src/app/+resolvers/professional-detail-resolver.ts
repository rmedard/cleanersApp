import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Professional} from '../+models/professional';
import {Observable} from 'rxjs/Observable';
import {ProfessionalsService} from '../+services/professionals.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {AuthService} from '../+services/auth.service';

@Injectable()
export class ProfessionalDetailResolver implements Resolve<Professional> {

  constructor(private professionalsService: ProfessionalsService, private router: Router, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Professional> | Promise<Professional> | Professional {
    let professionalId;
    if (route.params['id']) {
      professionalId = route.params['id'];
    } else if (this.authService.loggedIn() &&
      this.authService.getLoggedInUser().professionalId &&
      this.authService.getLoggedInUser().professionalId !== 0) {
      professionalId = this.authService.getLoggedInUser().professionalId;
    }

    return this.professionalsService.getProfessional(professionalId).catch(
      error => {
        console.log(error);
        this.router.navigate(['/professionals']);
        return Observable.of(null);
      }
    );
  }
}
