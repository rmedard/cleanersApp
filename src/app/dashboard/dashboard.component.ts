import {Component, OnInit} from '@angular/core';
import {Email} from '../+models/email';
import {EmailsService} from '../+services/emails.service';
import {ProfessionsComponent} from '../professions/professions.component';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  emails: Email[];
  alerts: any[] = [];

  constructor(private mailService: EmailsService) {
  }

  ngOnInit() {
    this.mailService.getEmails().subscribe(
      data => {
        this.emails = data;
      }, error => {
        this.alerts.push(
          {
            type: 'danger',
            msg: error.message,
            dismissible: true
          }
        );
      }
    );
  }

  onClosed(dismissedAlert: ProfessionsComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
