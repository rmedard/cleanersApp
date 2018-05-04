import {Routes} from '@angular/router';
import {ProfessionalListComponent} from './professionals/professional-list/professional-list.component';
import {CustomerListComponent} from './customers/customer-list/customer-list.component';
import {ServiceListComponent} from './services/service-list/service-list.component';
import {ProfessionsComponent} from './professions/professions.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'professions', component: ProfessionsComponent},
      {path: 'professionals', component: ProfessionalListComponent},
      {path: 'customers', component: CustomerListComponent},
      {path: 'services', component: ServiceListComponent},
    ]},
  {path: '**', component: HomeComponent}
];
