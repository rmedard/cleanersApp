import {Component, OnInit} from '@angular/core';
import {AuthService} from '../+services/auth.service';
import {Person} from '../+models/person';
import {Professional} from '../+models/professional';
import {Customer} from '../+models/customer';
import {ProfessionalsService} from '../+services/professionals.service';
import {CustomersService} from '../+services/customers.service';
import {Address} from '../+models/address';

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

  constructor(private authService: AuthService,
              private professionalsService: ProfessionalsService,
              private customersService: CustomersService) {
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
  }

  onClosed(dismissedAlert: ProfileComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
