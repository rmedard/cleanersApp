import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router'
import {BsModalRef, BsModalService, CarouselConfig} from 'ngx-bootstrap';
import {Professional} from '../../+models/professional';
import {ProfessionalsService} from '../../+services/professionals.service';
import * as _ from 'underscore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profession} from '../../+models/profession';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: {
        interval: 3000,
        noPause: true,
        showIndicators: true
      }
    }
  ]
})
export class HomeComponent implements OnInit {

  title: 'Home Cleaners';
  professionals: Professional[];
  alerts: any[] = [];

  orderForm: FormGroup;
  dropDownProfessions: Profession[];
  orderModalRef: BsModalRef;
  minDate: Date = new Date();
  isMeridian = false;

  hoursOptions: SelectItem[];

  orderedProfessional: Professional;
  totalOrderPrice: number;

  getActivitySectors(professional: Professional) {
    return _.uniq(_.pluck(_.map(professional.expertises, data => data.profession), 'category'));
  }

  constructor(private professionalsService: ProfessionalsService, private formBuilder: FormBuilder, private modalService: BsModalService, private router: Router) {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      professionId: ['', [Validators.required]],
      professionalId: ['', [Validators.required]],
      startTime: [new Date(), [Validators.required]],
      orderedTime: [new Date(), [Validators.required]],
      duration: [1, [Validators.required, Validators.min(1)]]
    });
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
    this.professionalsService.getProfessionals().subscribe(data => {
      this.professionals = data;
    }, () => {
      this.alerts.push({
        type: 'danger',
        msg: 'Error retrieving data',
        dismissible: true
      });
    });

    // Get current user location
    // if (window.navigator.geolocation) {
    //   window.navigator.geolocation.getCurrentPosition(position => {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     console.log('Latitude: ' + latitude);
    //     console.log('Longitude: ' + longitude);
    //   });
    // }
  }

  onCreateOrder() {

  }

  toCommand(professional: Professional) {
    this.orderedProfessional = professional;
    this.dropDownProfessions = _.map(professional.expertises, data => data.profession);
    this.router.navigate(['commandes', {mode: 'test'}]);
  }

  openOrderModal(template: TemplateRef<any>, professional: Professional) {
    this.orderedProfessional = professional;
    this.dropDownProfessions = _.map(professional.expertises, data => data.profession);
    // debugger;
    //this.onProfessionChange(this.dropDownProfessions[0].id);
    // this.orderForm.controls['professionId'].setValue(this.dropDownProfessions[0].id);
    //this.orderModalRef = this.modalService.show(template);
  }

  onProfessionChange($event) {
    this.orderForm.controls['professionId'].setValue($event as number);
    const duration = this.orderForm.controls['duration'].value;
    if (duration as number > 0) {
      this.totalOrderPrice = _.findWhere(this.orderedProfessional.expertises, {'professionId': $event}).unitPrice * duration;
    } else {
      this.totalOrderPrice = 0;
    }
  }

  onDurationChange(value: any) {
    const duration = value as number;
    const professionId = this.orderForm.controls['professionId'].value;
    if (duration as number > 0) {
      this.totalOrderPrice = _.findWhere(this.orderedProfessional.expertises, {'professionId': professionId}).unitPrice * duration;
    } else {
      this.totalOrderPrice = 0;
    }
  }
}
