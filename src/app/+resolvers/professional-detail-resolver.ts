import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Professional} from '../+models/professional';
import {Observable} from 'rxjs/Observable';
import {ProfessionalsService} from '../+services/professionals.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ProfessionalDetailResolver implements Resolve<Professional> {

  constructor(private professionalsService: ProfessionalsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Professional> | Promise<Professional> | Professional {
    return this.professionalsService.getProfessional(route.params['id']).catch(
      error => {
        console.log(error);
        this.router.navigate(['/professionals']);
        return Observable.of(null);
      }
    );
  }
}
