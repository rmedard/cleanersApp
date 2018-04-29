import {Component, Input, OnInit} from '@angular/core';
import {Professional} from '../../+models/professional';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.css']
})
export class ProfessionalCardComponent implements OnInit {

  @Input() professional: Professional;

  constructor() { }

  ngOnInit() {
  }

}
