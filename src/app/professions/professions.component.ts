import {Component, OnInit} from '@angular/core';
import {Category, Profession} from '../+models/profession';
import {ProfessionsService} from '../+services/professions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.css']
})
export class ProfessionsComponent implements OnInit {

  professions: Profession[];
  professionCategories: string[];

  professionForm: FormGroup;
  isCollapsed = true;

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

  onClosed(dismissedAlert: ProfessionsComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onCreateProfession() {
    const profession: Profession = this.formModelToProfession();
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

  editProfession(id: number) {
    const selected = _.findWhere(this.professions, {'id': id}) as Profession;
    this.professionForm.setValue(this.professionToFormModel(selected));
    this.isCollapsed = false;
  }

  private formModelToProfession() {
    const professionModel = this.professionForm.value;
    return {
      title: professionModel.title,
      category: professionModel.category,
      description: professionModel.description
    } as Profession;
  }

  private professionToFormModel(profession: Profession) {
    return {
      title: profession.title,
      category: profession.category,
      description: profession.description ? profession.description : ''
    };
  }
}
