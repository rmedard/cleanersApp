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
import {RegisterComponent} from './static/register/register.component';
import {LoginComponent} from './static/login/login.component';
import {AuthGuardService} from './+guards/auth-guard.service';
import {AdminGuard} from './+guards/admin.guard';
import {ProfileComponent} from './profile/profile.component';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  {
    path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuardService], children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'professions', component: ProfessionsComponent},
      {path: 'professionals', component: ProfessionalListComponent},
      {path: 'professionals/:id', component: ProfessionalCardComponent, resolve: {professional: ProfessionalDetailResolver}},
      {path: 'customers', component: CustomerListComponent},
      {path: 'services', component: ServiceListComponent},
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: HomeComponent}
];
