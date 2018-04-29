import { Component, OnInit } from '@angular/core';
import {Professional} from '../../+models/professional';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.css']
})
export class ProfessionalListComponent implements OnInit {

  professionals: Professional[];

  constructor() { }

  ngOnInit() {
  }

}
