import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from '../+services/auth.service';
import {Person} from '../+models/person';
import {Professional} from '../+models/professional';
import {Customer} from '../+models/customer';
import {ProfessionalsService} from '../+services/professionals.service';
import {CustomersService} from '../+services/customers.service';
import {Address} from '../+models/address';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Expertise} from '../+models/expertise';
import {Profession} from '../+models/profession';
import {ProfessionsService} from '../+services/professions.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  alerts: any[] = [];
  person: Person;
  professional: Professional;
  customer: Customer;

  expertiseModalRef: BsModalRef;
  expertiseForm: FormGroup;
  selectedExpertise: Expertise;

  professions: Profession[];
  dropDownProfessions: Profession[];

  constructor(private authService: AuthService,
              private professionalsService: ProfessionalsService,
              private customersService: CustomersService,
              private professionsService: ProfessionsService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const user = this.authService.getLoggedInUser();
    if (user && (user.professionalId || user.customerId)) {
      if (user.professionalId && user.professionalId > 0) {
        this.professionalsService.getProfessional(user.professionalId).subscribe(data => {
          this.professional = data;
          this.person = {
            address: this.professional.address,
            phone: this.professional.phone,
            email: this.professional.email,
            lastName: this.professional.lastName,
            firstName: this.professional.firstName
          } as Person;

          this.expertiseForm = this.formBuilder.group({
            editMode: [false],
            professionalId: [this.professional.id],
            professionId: [null, Validators.required],
            rate: [0.00, [Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
          });
        });
      }

      if (user.customerId && user.customerId > 0) {
        this.customersService.getCustomer(user.customerId).subscribe(data => {
          this.customer = data;
          this.person = {
            address: this.customer.address,
            phone: this.customer.phone,
            email: this.customer.email,
            lastName: this.customer.lastName,
            firstName: this.customer.firstName
          } as Person;
        });
      }
    } else {
      this.person = {address: {} as Address} as Person;
    }

    this.professionsService.getProfessions().subscribe(data => {
      this.professions = data;
    }, error => {
      this.alerts.push({
        type: 'danger',
        msg: error,
        dismissible: true
      });
    });
  }

  onClosed(dismissedAlert: ProfileComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onSaveExpertise() {
    const expertiseFormModal = this.expertiseForm.value;
    console.log('Edit mode: ' + this.expertiseForm.value.editMode);
    if (this.expertiseForm.value.editMode) {
      const expertise = {
        professionId: this.selectedExpertise.profession.id,
        professionalId: this.professional.id,
        unitPrice: expertiseFormModal.rate
      };
      this.professionalsService.updateExpertise(this.professional.id, expertise).subscribe(() => {
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
}
