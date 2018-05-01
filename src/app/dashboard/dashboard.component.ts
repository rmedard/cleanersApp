import {Component, OnInit} from '@angular/core';
import {Profession} from '../+models/profession';
import {ProfessionsService} from '../+services/professions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  professions: Profession[];

  alerts: any[] = [];

  constructor(private professionsService: ProfessionsService) { }

  ngOnInit() {
    this.professionsService.getProfessions().subscribe(
      data => {
        this.professions = data as Profession[];
        },
        error => {
        console.log(error);
        this.alerts.push(
          {
            type: 'danger',
            msg: error.message,
            dismissible: true
          }
        );
      },
      () => console.log('Done loading professions')
    );
  }

  onClosed(dismissedAlert: DashboardComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
