import {Component, OnInit} from '@angular/core';
import {EmailsService} from '../+services/emails.service';
import {ProfessionsComponent} from '../professions/professions.component';
import 'rxjs/add/operator/map';
import {Professional} from '../+models/professional';
import {Profession} from '../+models/profession';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  // emails: Email[];
  // alerts: any[] = [];
  orderedProfessional: Professional;
  dropDownProfessions: Profession[];
  hoursOptions: SelectItem[];

  constructor(private mailService: EmailsService) {
  }

  ngOnInit() {
    // alert('ddddd');
    // this.openOrderModal('1');
    this.hoursOptions = [
      {label: '8:00-9:00', value: '8:00-9:00'},
      {label: '9:00-10:00', value: '8:00-9:00'},
      {label: '10:00-11:00', value: '8:00-9:00'},
      {label: '11:00-12:00', value: '8:00-9:00'},
      {label: '12:00-13:00', value: '8:00-9:00'},
      {label: '13:00-14:00', value: '8:00-9:00'},
      {label: '14:00-15:00', value: '8:00-9:00'},
      {label: '15:00-16:00', value: '8:00-9:00'},
    ];
  }

  onClosed(dismissedAlert: CommandesComponent): void {
    // this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openOrderModal(professional: Professional) {
    this.orderedProfessional = professional;
    this.dropDownProfessions = _.map(professional.expertises, data => data.profession);
    // debugger;
    // this.onProfessionChange(this.dropDownProfessions[0].id);
    // this.orderForm.controls['professionId'].setValue(this.dropDownProfessions[0].id);
    // this.orderModalRef = this.modalService.show(template);
  }

 // onProfessionChange($event) {
 //   this.orderForm.controls['professionId'].setValue($event as number);
 //   const duration = this.orderForm.controls['duration'].value;
 //   if (duration as number > 0) {
 //     this.totalOrderPrice = _.findWhere(this.orderedProfessional.expertises, {'professionId': $event}).unitPrice * duration;
 //   } else {
 //     this.totalOrderPrice = 0;
 //   }
 // }
}
