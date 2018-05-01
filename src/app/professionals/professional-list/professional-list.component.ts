import {Component, OnInit} from '@angular/core';
import {Professional} from '../../+models/professional';
import {ProfessionalsService} from '../../+services/professionals.service';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.css']
})
export class ProfessionalListComponent implements OnInit {

  professionals: Professional[];

  constructor(private professionalsService: ProfessionalsService) { }

  ngOnInit() {
    this.professionalsService.getProfessionals().subscribe(
      data => {
        this.professionals = data as Professional[];
      }, error => console.log(error),
      () => console.log('Done loading professionals')
    );
  }

}
