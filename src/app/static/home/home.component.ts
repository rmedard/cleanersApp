import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap';
import {Professional} from '../../+models/professional';
import {ProfessionalsService} from '../../+services/professionals.service';
import * as _ from 'underscore';

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

  getActivitySectors(professional: Professional) {
    return _.uniq(_.pluck(_.map(professional.expertises, data => data.profession), 'category'));
  }

  constructor(private professionalsService: ProfessionalsService) {
  }

  ngOnInit() {
    this.professionalsService.getProfessionals().subscribe(data => {
      this.professionals = data;
    }, () => {
      this.alerts.push({
        type: 'danger',
        msg: 'Error retrieving data',
        dismissible: true
      });
    });

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitude: ' + latitude);
        console.log('Longitude: ' + longitude);
      });
    }
  }

}
