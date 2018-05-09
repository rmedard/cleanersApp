import {Component, Input, OnInit} from '@angular/core';
import {Professional} from '../../+models/professional';
import {ProfessionalListComponent} from '../professional-list/professional-list.component';
import {ActivatedRoute} from '@angular/router';
import {ProfessionalsService} from '../../+services/professionals.service';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.css']
})
export class ProfessionalCardComponent implements OnInit {

  professional: Professional;
  alerts: any[] = [];

  constructor(private route: ActivatedRoute, private professionalsService: ProfessionalsService) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.professional = data['professional'];
    });
  }

  onClosed(dismissedAlert: ProfessionalListComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
