import {Component, OnInit, TemplateRef} from '@angular/core';
import {Professional} from '../../+models/professional';
import {ProfessionalListComponent} from '../professional-list/professional-list.component';
import {ActivatedRoute} from '@angular/router';
import {ProfessionalsService} from '../../+services/professionals.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'underscore';
import {Expertise} from '../../+models/expertise';
import {Profession} from '../../+models/profession';
import {ProfessionsService} from '../../+services/professions.service';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.css']
})
export class ProfessionalCardComponent implements OnInit {

  professional: Professional;
  professions: Profession[];
  dropDownProfessions: Profession[];
  alerts: any[] = [];
  expertiseModalRef: BsModalRef;
  expertiseForm: FormGroup;

  private selectedExpertise: Expertise;

  constructor(private route: ActivatedRoute,
              private professionalsService: ProfessionalsService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private professionsService: ProfessionsService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.professional = data['professional'];
    });
    this.professionsService.getProfessions().subscribe(data => {
      this.professions = data;
    }, error => {
      this.alerts.push({
        type: 'danger',
        msg: error,
        dismissible: true
      });
    });
    this.expertiseForm = this.formBuilder.group({
      editMode: [false],
      professionalId: [this.professional.id],
      professionId: [null, Validators.required],
      rate: [0.00, [Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });
  }

  onClosed(dismissedAlert: ProfessionalListComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openModal(editMode: boolean = false, expertiseTemplate: TemplateRef<any>, expertise?: Expertise) {
    this.expertiseForm.controls['editMode'].setValue(editMode);
    this.dropDownProfessions = this.professions;
    this.selectedExpertise = expertise;
    if (editMode) {
      this.expertiseForm.controls['professionId'].setValue(expertise.profession.id);
      this.expertiseForm.controls['rate'].setValue(expertise.unitPrice);
      this.expertiseForm.controls['professionId'].disable();
    } else {
      // Remove already owned professions
      this.dropDownProfessions = _.filter(this.professions, data => {
        return !_.findWhere(_.map(this.professional.expertises, function (data1) {
          return data1.profession;
        }), data);
      });
    }
    this.expertiseModalRef = this.modalService.show(expertiseTemplate);
  }

  onCreateExpertise() {
    const expertiseFormModal = this.expertiseForm.value;
    if (this.expertiseForm.value.editMode) {
      const expertise = {
        professionId: this.selectedExpertise.profession.id,
        professionalId: this.professional.id,
        unitPrice: expertiseFormModal.rate
      };
      console.log(expertise);
      this.professionalsService.updateExpertise(this.professional.id, expertise).subscribe(
        () => {
          const exp = _.findWhere(this.professional.expertises, {'profession': this.selectedExpertise.profession}) as Expertise;
          const index = this.professional.expertises.indexOf(exp);
          this.professional.expertises[index].unitPrice = expertise.unitPrice;
          this.alerts.push({
            type: 'success',
            msg: 'Expertise updated successfully',
            dismissible: true
          });
          this.expertiseForm.reset();
          this.expertiseModalRef.hide();
        }, () => {
          this.alerts.push({
            type: 'danger',
            msg: 'Update failed...',
            dismissible: true
          });
        }
      );
    } else {
      const expertise = {
        professionId: expertiseFormModal.professionId,
        professionalId: this.professional.id,
        unitPrice: expertiseFormModal.rate
      };
      this.professionalsService.grantExpertise(this.professional.id, expertise).subscribe(
        () => {
          this.professional.expertises.push(
            {
              professional: this.professional,
              profession: _.findWhere(this.professions, {id: Number(expertise.professionId)}) as Profession,
              unitPrice: expertise.unitPrice
            } as Expertise);
          this.alerts.push({
            type: 'success',
            msg: 'Expertise added successfully',
            dismissible: true
          });
          this.expertiseForm.reset();
          this.expertiseModalRef.hide();
        }
      );
    }
  }
}
