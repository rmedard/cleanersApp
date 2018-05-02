import {Component, OnInit} from '@angular/core';
import {Category, Profession} from '../+models/profession';
import {ProfessionsService} from '../+services/professions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  professions: Profession[];
  newProfession: Profession = {} as Profession;
  professionCategories: string[];

  alerts: any[] = [];

  constructor(private professionsService: ProfessionsService) {
  }

  ngOnInit() {
    this.professionCategories = Object.keys(Category).filter((type) => isNaN(<any>type) && type !== 'values');
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

  onCreateProfession() {
    console.log(this.newProfession);
    this.professionsService.createProfession(this.newProfession).subscribe(
      data => {
        this.professions.push(data as Profession);
        this.alerts.push({
          type: 'success',
          msg: 'A new profession created successfully',
          dismissible: true
        });
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
}
