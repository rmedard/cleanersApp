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
import {SelectItem} from 'primeng/api';
import {ServiceForCreate} from '../../+models/dto/service-for-create';
import {ExpertiseForServiceCreate} from '../../+models/dto/expertise-for-service-create';
import {AuthService} from '../../+services/auth.service';
import {User} from '../../+models/user';
import * as moment from 'moment';
import {OrderService} from '../../+services/order.service';

@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.css']
})
export class ProfessionalCardComponent implements OnInit {

  minimumDate: Date = new Date();
  professional: Professional;
  professions: Profession[];
  dropDownProfessions: Profession[];
  alerts: any[] = [];
  expertiseModalRef: BsModalRef;
  expertiseForm: FormGroup;

  orderForm: FormGroup;
  isOrderFormCollapsed = true;
  hoursOptions: SelectItem[];

  selectedExpertise: Expertise;
  totalOrderPrice: number;

  loggedInUser: User;

  constructor(private route: ActivatedRoute,
              private professionalsService: ProfessionalsService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private professionsService: ProfessionsService,
              private authService: AuthService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
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

    this.hoursOptions = [];
    this.hoursOptions.push({label: '8:00-9:00', value: 8});
    this.hoursOptions.push({label: '9:00-10:00', value: 9});
    this.hoursOptions.push({label: '10:00-11:00', value: 10});
    this.hoursOptions.push({label: '11:00-12:00', value: 11});
    this.hoursOptions.push({label: '12:00-13:00', value: 12});
    this.hoursOptions.push({label: '13:00-14:00', value: 13});
    this.hoursOptions.push({label: '14:00-15:00', value: 14});
    this.hoursOptions.push({label: '15:00-16:00', value: 15});

    this.orderForm = this.formBuilder.group({
      professionId: ['', [Validators.required]],
      professionalId: ['', [Validators.required]],
      startTime: [new Date(), [Validators.required]],
      orderedTime: [new Date(), [Validators.required]],
      selectedHours: [[] as string[], [Validators.required, Validators.minLength(1)]]
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

  onCreateOrder() {
    if (this.loggedInUser.customerId > 0) {
      const service = {
        customerId: this.loggedInUser.customerId,
        startTime: this.orderForm.controls['startTime'].value,
        duration: (this.orderForm.controls['selectedHours'].value as string[]).length,
        expertiseForServiceCreate: {
          professionalId: this.orderForm.controls['professionalId'].value,
          professionId: this.orderForm.controls['professionId'].value
        } as ExpertiseForServiceCreate
      } as ServiceForCreate;
      console.log(service);
      this.orderService.createOrder(service).subscribe(() => {
        this.alerts.push({
          type: 'success',
          msg: 'Votre commande est réussie',
          dismissible: true
        });
      }, error => {
        this.alerts.push({
          type: 'danger',
          msg: 'Erreur: ' + error.error,
          dismissible: true
        });
      });
    } else {
      this.alerts.push({
        type: 'danger',
        msg: 'Vous n\'avez pas de compte client!!',
        dismissible: true
      });
    }
  }

  onOrderBtnClick(expertise: Expertise) {
    this.isOrderFormCollapsed = false;
    this.selectedExpertise = expertise;
    this.orderForm.controls['professionId'].setValue(expertise.profession.id);
    this.orderForm.controls['professionalId'].setValue(expertise.professional.id);
    const selectedHours = this.orderForm.controls['selectedHours'].value as string[];
    this.totalOrderPrice = selectedHours.length * expertise.unitPrice;
  }

  onOrderFormReset() {
    this.isOrderFormCollapsed = true;
    this.orderForm.reset({'selectedHours': []});
  }

  onOrderHourChange() {
    const selectedHours = this.orderForm.controls['selectedHours'].value as number[];
    const startDate = this.orderForm.controls['startTime'].value as Date;
    const startTime = Math.min(... selectedHours) + ':00';
    const momentTime = moment(startTime, 'HH:mm');
    startDate.setHours(momentTime.hours());
    startDate.setMinutes(momentTime.minutes());
    this.orderForm.controls['startTime'].setValue(startDate);
    this.totalOrderPrice = (this.orderForm.controls['selectedHours'].value as string[]).length * this.selectedExpertise.unitPrice;
  }
}
