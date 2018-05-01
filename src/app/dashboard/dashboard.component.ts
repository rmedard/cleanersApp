import {Component, OnInit, TemplateRef} from '@angular/core';
import {Profession} from '../+models/profession';
import {ProfessionsService} from '../+services/professions.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  modalRef: BsModalRef;
  professions: Profession[];

  constructor(private professionsService: ProfessionsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.professionsService.getProfessions().subscribe(
      data => {
        this.professions = data as Profession[];
      }, error => console.log(error),
      () => console.log('Done loading professions')
    );
  }

}
