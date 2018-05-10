import {Component, OnInit} from '@angular/core';
import {Professional} from '../../+models/professional';
import {ProfessionalsService} from '../../+services/professionals.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.css']
})
export class ProfessionalListComponent implements OnInit {

  professionals: Professional[];

  professionalForm: FormGroup;
  isCollapsed = true;

  alerts: any[] = [];

  constructor(private professionalsService: ProfessionalsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.professionalForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });

    this.professionalsService.getProfessionals().subscribe(
      data => {
        this.professionals = data;
      }, error => console.log(error),
      () => console.log('Done loading professionals')
    );
  }

  onClosed(dismissedAlert: ProfessionalListComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onCreateProfessional() {
    // const professional: Professional = this.formModelToProfessional();

  }

  // private formModelToProfessional() {
  //   const professionalModel = this.professionalForm.value;
  //   return {
  //     id: professionalModel.id,
  //     title: professionalModel.title,
  //     category: professionalModel.category,
  //     description: professionalModel.description
  //   } as Professional;
  // }
}
