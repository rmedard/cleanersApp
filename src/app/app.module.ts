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
import {HttpClientModule} from '@angular/common/http';
import {ProfessionsComponent} from './professions/professions.component';
import {ProfessionsService} from './+services/professions.service';
import {ProfessionalsService} from './+services/professionals.service';
import {AlertModule, CarouselModule, CollapseModule, ModalModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './static/home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TopBarComponent} from './+menus/top-bar/top-bar.component';
import {AboutComponent} from './static/about/about.component';
import {ContactComponent} from './static/contact/contact.component';
import { NavigationBarComponent } from './static/layout/navigation-bar/navigation-bar.component';
import { FooterComponent } from './static/layout/footer/footer.component';
import {EmailsService} from './+services/emails.service';
import {ProfessionalDetailResolver} from './+resolvers/professional-detail-resolver';
import { ProfessionalRegisterComponent } from './static/register/professional-register/professional-register.component';
import { CustomerRegisterComponent } from './static/register/customer-register/customer-register.component';


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
    ProfessionalRegisterComponent,
    CustomerRegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    AlertModule.forRoot(), ReactiveFormsModule, CarouselModule.forRoot(), CollapseModule.forRoot()
  ],
  providers: [
    ProfessionsService,
    ProfessionalsService,
    EmailsService,
    ProfessionalDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
