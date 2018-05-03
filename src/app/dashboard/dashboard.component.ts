import {Component, OnInit} from '@angular/core';
import {Category, Profession} from '../+models/profession';
import {ProfessionsService} from '../+services/professions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  professions: Profession[];
  professionCategories: string[];

  professionForm: FormGroup;

  alerts: any[] = [];

  constructor(private professionsService: ProfessionsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.professionForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['']
    });

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
    const profession: Profession = this.mapProfession();
    this.professionsService.createProfession(profession).subscribe(
      data => {
        this.professions.push(data as Profession);
        this.professionForm.reset();
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

  private mapProfession() {
    const professionModel = this.professionForm.value;
    return {
      title: professionModel.title,
      category: professionModel.category,
      description: professionModel.description
    } as Profession;
  }
}
