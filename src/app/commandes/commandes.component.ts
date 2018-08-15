import {Component, OnInit} from '@angular/core';
import {EmailsService} from '../+services/emails.service';
import {ProfessionalsService} from '../+services/professionals.service';
import {ProfessionsComponent} from '../professions/professions.component';
import 'rxjs/add/operator/map';
import {Professional} from '../+models/professional';
import {Profession} from '../+models/profession';
import * as _ from 'underscore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  // emails: Email[];
  // alerts: any[] = [];
  orderLabel: string;
  orderForm: FormGroup;
  orderedProfessional: Professional;
  dropDownProfessions: Profession[];
  hoursOptions: SelectItem[];
  totalOrderPrice: number;

  constructor(private mailService: EmailsService, private ProfessionalService: ProfessionalsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.ProfessionalService.getProfessional(1).subscribe(response => {
      // console.log(response);
      this.orderedProfessional = response;
      this.orderLabel = response.firstName + ' ' + response.lastName + ' (' + response.regNumber + ')' + response.phone;
      this.dropDownProfessions = _.map(response.expertises, data => data.profession);
    });

    this.orderForm = this.formBuilder.group({
      professionId: ['', [Validators.required]],
      professionalId: ['', [Validators.required]],
      startTime: [new Date(), [Validators.required]],
      orderedTime: [new Date(), [Validators.required]],
      duration: [1, [Validators.required, Validators.min(1)]],
      selectedHours: [[] as string[], [Validators.required, Validators.minLength(1)]]
    });

    this.hoursOptions = [];
    this.hoursOptions.push({label: '8:00-9:00', value: 8});
    this.hoursOptions.push({label: '9:00-10:00', value: 9});
    this.hoursOptions.push({label: '10:00-11:00', value: 10});
    this.hoursOptions.push({label: '11:00-12:00', value: 11});
    this.hoursOptions.push({label: '12:00-13:00', value: 12});
    this.hoursOptions.push({label: '13:00-14:00', value: 13});
    this.hoursOptions.push({label: '14:00-15:00', value: 14});
    this.hoursOptions.push({label: '15:00-16:00', value: 15});

  }

  onClosed(dismissedAlert: CommandesComponent): void {
    // this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onProfessionChange($event) {

    this.orderForm.controls['professionId'].setValue($event as number);
    const duration = this.orderForm.controls['duration'].value;
    if (duration as number > 0) {
      this.totalOrderPrice = _.findWhere(this.orderedProfessional.expertises, {'professionId': parseInt($event)}).unitPrice * duration;
    } else {
      this.totalOrderPrice = 0;
    }
  }

  onDurationChange(value: any) {
    const duration = value as number;
    const professionId = this.orderForm.controls['professionId'].value;
    if (duration as number > 0) {
      this.totalOrderPrice = _.findWhere(this.orderedProfessional.expertises, {'professionId': parseInt(professionId)}).unitPrice * duration;
    } else {
      this.totalOrderPrice = 0;
    }
  }

  onCreateOrder() {

  }

}
