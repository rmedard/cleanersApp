import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProfessionalCardComponent } from './professionals/professional-card/professional-card.component';
import { ProfessionalListComponent } from './professionals/professional-list/professional-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessionalCardComponent,
    ProfessionalListComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
