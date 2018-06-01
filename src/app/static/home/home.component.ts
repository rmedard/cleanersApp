import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService, CarouselConfig} from 'ngx-bootstrap';
import {Professional} from '../../+models/professional';
import {ProfessionalsService} from '../../+services/professionals.service';
import * as _ from 'underscore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profession} from '../../+models/profession';

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
  options: any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };
  hours: number[];
  orderedProfessional: Professional;
  totalOrderPrice: number;

  getActivitySectors(professional: Professional) {
    return _.uniq(_.pluck(_.map(professional.expertises, data => data.profession), 'category'));
  }

  constructor(private professionalsService: ProfessionalsService, private formBuilder: FormBuilder, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      professionId: ['', [Validators.required]],
      professionalId: ['', [Validators.required]],
      startTime: [new Date(), [Validators.required]],
      orderedTime: [new Date(), [Validators.required]],
      duration: [1, [Validators.required, Validators.min(1)]]
    });
    this.hours = [1, 2, 3, 4, 5, 6, 7, 8];
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

  openOrderModal(template: TemplateRef<any>, professional: Professional) {
    this.orderedProfessional = professional;
    this.dropDownProfessions = _.map(professional.expertises, data => data.profession);
    this.onProfessionChange(this.dropDownProfessions[0].id);
    // this.orderForm.controls['professionId'].setValue(this.dropDownProfessions[0].id);
    this.orderModalRef = this.modalService.show(template);
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
