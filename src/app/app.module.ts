import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProfessionalCardComponent} from './professionals/professional-card/professional-card.component';
import {ProfessionalListComponent} from './professionals/professional-list/professional-list.component';
import {SidebarComponent} from './+menus/sidebar/sidebar.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {CustomerCardComponent} from './customers/customer-card/customer-card.component';
import {CustomerListComponent} from './customers/customer-list/customer-list.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {ServiceCardComponent} from './services/service-card/service-card.component';
import {ServiceListComponent} from './services/service-list/service-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProfessionsComponent} from './professions/professions.component';
import {ProfessionsService} from './+services/professions.service';
import {ProfessionalsService} from './+services/professionals.service';
import {
  AlertModule,
  BsDropdownModule,
  ButtonsModule,
  CarouselModule,
  CollapseModule,
  ModalModule,
  TimepickerModule
} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './static/home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TopBarComponent} from './+menus/top-bar/top-bar.component';
import {AboutComponent} from './static/about/about.component';
import {ContactComponent} from './static/contact/contact.component';
import { NavigationBarComponent } from './static/layout/navigation-bar/navigation-bar.component';
import { FooterComponent } from './static/layout/footer/footer.component';
import {EmailsService} from './+services/emails.service';
import {ProfessionalDetailResolver} from './+resolvers/professional-detail-resolver';
import { RegisterComponent } from './static/register/register.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {CustomersService} from './+services/customers.service';
import { LoginComponent } from './static/login/login.component';
import {AuthService} from './+services/auth.service';
import {AuthGuardService} from './+guards/auth-guard.service';
import {TokenInterceptorService} from './+resolvers/token-interceptor.service';
import {CalendarModule, SelectButtonModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrderService} from './+services/order.service';
import {AdminGuard} from './+guards/admin.guard';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessionalCardComponent,
    ProfessionalListComponent,
    SidebarComponent,
    CustomerCardComponent,
    CustomerListComponent,
    ServiceCardComponent,
    ServiceListComponent,
    ProfessionsComponent,
    HomeComponent,
    DashboardComponent,
    TopBarComponent,
    AboutComponent,
    ContactComponent,
    NavigationBarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    AlertModule.forRoot(), ReactiveFormsModule, FormsModule,
    CarouselModule.forRoot(), CollapseModule.forRoot(),
    ButtonsModule.forRoot(), BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(), SelectButtonModule, CalendarModule, BrowserAnimationsModule,
    GooglePlaceModule
  ],
  providers: [
    ProfessionsService,
    ProfessionalsService,
    EmailsService,
    CustomersService,
    ProfessionalDetailResolver,
    OrderService,
    AuthService,
    AuthGuardService,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
