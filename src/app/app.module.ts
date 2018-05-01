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
import { DashboardComponent } from './dashboard/dashboard.component';
import {ProfessionsService} from './+services/professions.service';
import {ProfessionalsService} from './+services/professionals.service';
import {ModalModule} from 'ngx-bootstrap';


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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot()
  ],
  providers: [
    ProfessionsService, ProfessionalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
