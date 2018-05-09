import {Routes} from '@angular/router';
import {ProfessionalListComponent} from './professionals/professional-list/professional-list.component';
import {CustomerListComponent} from './customers/customer-list/customer-list.component';
import {ServiceListComponent} from './services/service-list/service-list.component';
import {ProfessionsComponent} from './professions/professions.component';
import {HomeComponent} from './static/home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './static/about/about.component';
import {ContactComponent} from './static/contact/contact.component';
import {ProfessionalCardComponent} from './professionals/professional-card/professional-card.component';
import {ProfessionalDetailResolver} from './+resolvers/professional-detail-resolver';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {
    path: '', children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'professions', component: ProfessionsComponent},
      {path: 'professionals', component: ProfessionalListComponent},
      {path: 'professionals/:id', component: ProfessionalCardComponent, resolve: {professional: ProfessionalDetailResolver}},
      {path: 'customers', component: CustomerListComponent},
      {path: 'services', component: ServiceListComponent},
    ]
  },
  {path: '**', component: HomeComponent}
];
