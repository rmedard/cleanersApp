import {Routes} from '@angular/router';
import {ProfessionalListComponent} from './professionals/professional-list/professional-list.component';
import {CustomerListComponent} from './customers/customer-list/customer-list.component';
import {ServiceListComponent} from './services/service-list/service-list.component';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'professionals', component: ProfessionalListComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'services', component: ServiceListComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
