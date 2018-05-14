import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfessionalsService} from '../../../+services/professionals.service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {CustomersService} from '../../../+services/customers.service';
import {Customer} from '../../../+models/customer';
import {Address as UserAddress} from '../../../+models/address';
import {Professional} from '../../../+models/professional';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  attachedUser: false;
  flavor: string;
  googleOptions = '{types: [], componentRestrictions: { country: "BE" }}';
  alerts: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private professionalsService: ProfessionalsService,
              private customersService: CustomersService) {
  }

  ngOnInit() {
    this.flavor = 'Customer';
    this.registerForm = this.formBuilder.group({
      addressSearchToken: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      commune: [{value: '', disabled: true}],
      zipCode: [{value: '', disabled: true}],
      street: [{value: '', disabled: true}],
      houseNumber: [{value: '', disabled: true}],
      username: [{value: '', disabled: true}],
      password: [{value: '', disabled: true}]
    });
  }

  onRegister() {
    if (this.flavor === 'Customer') {
      const customer = {
        firstName: this.registerForm.controls['firstName'].value,
        lastName: this.registerForm.controls['lastName'].value,
        email: this.registerForm.controls['email'].value,
        phone: this.registerForm.controls['phone'].value,
        address: {
          zipcode: this.registerForm.controls['zipCode'].value,
          commune: this.registerForm.controls['commune'].value,
          street: this.registerForm.controls['street'].value,
          number: this.registerForm.controls['houseNumber'].value
        } as UserAddress,
      } as Customer;
      if (this.attachedUser) {
        this.customersService.createCustomer(customer).subscribe(data => {
          const cust = data as Customer;
          this.customersService.addUserToCustomer(cust.id, {
            'username': this.registerForm.controls['username'].value,
            'password': this.registerForm.controls['password'].value
          }).subscribe(() => {
            this.alerts.push({
              type: 'success',
              msg: 'You have been registered successfully',
              dismissible: true
            });
          });
        }, error => {
          this.alerts.push({
            type: 'danger',
            msg: 'Failed to register: ' + error,
            dismissible: true
          });
        });
      } else {
        this.customersService.createCustomer(customer).subscribe(() => {
          this.alerts.push({
            type: 'success',
            msg: 'You have been registered successfully',
            dismissible: true
          });
        }, error => {
          this.alerts.push({
            type: 'danger',
            msg: 'Failed to register: ' + error,
            dismissible: true
          });
        });
      }
    } else if (this.flavor === 'Professional') {
      const professional = {
        firstName: this.registerForm.controls['firstName'].value,
        lastName: this.registerForm.controls['lastName'].value,
        email: this.registerForm.controls['email'].value,
        phone: this.registerForm.controls['phone'].value,
        address: {
          commune: this.registerForm.controls['commune'].value,
          zipcode: this.registerForm.controls['zipcode'].value,
          street: this.registerForm.controls['street'].value,
          number: this.registerForm.controls['houseNumber'].value
        } as UserAddress
      } as Professional;
      if (this.attachedUser) {
        this.professionalsService.createProfessional(professional).subscribe(data => {
          const prof = data as Professional;
          this.professionalsService.addUserToProfessional(prof.id, {
            'username': this.registerForm.controls['username'].value,
            'password': this.registerForm.controls['password'].value
          }).subscribe(() => {
            this.alerts.push({
              type: 'success',
              msg: 'You have been registered successfully',
              dismissible: true
            });
          });
        }, error => {
          this.alerts.push({
            type: 'danger',
            msg: 'Failed to register: ' + error,
            dismissible: true
          });
        });
      } else {
        this.professionalsService.createProfessional(professional).subscribe(() => {
          this.alerts.push({
            type: 'success',
            msg: 'You have been registered successfully',
            dismissible: true
          });
        }, error => {
          this.alerts.push({
            type: 'danger',
            msg: 'Failed to register: ' + error,
            dismissible: true
          });
        });
      }
    }
  }

  onAttachUser($event) {
    this.attachedUser = $event.target.checked;
    if ($event.target.checked) {
      this.registerForm.controls['username'].enable();
      this.registerForm.controls['password'].enable();
      this.registerForm.controls['username'].setValidators(Validators.required);
      this.registerForm.controls['password'].setValidators(Validators.required);
    } else {
      this.registerForm.controls['username'].reset();
      this.registerForm.controls['password'].reset();
      this.registerForm.controls['username'].disable();
      this.registerForm.controls['password'].disable();
    }
  }

  handleAddressChange($event: Address) {
    this.registerForm.controls['houseNumber'].reset();
    this.registerForm.controls['street'].reset();
    this.registerForm.controls['commune'].reset();
    this.registerForm.controls['zipCode'].reset();
    for (const component of $event.address_components) {
      switch (component.types[0]) {
        case 'street_number':
          this.registerForm.controls['houseNumber'].setValue(component.long_name);
          break;
        case 'route':
          this.registerForm.controls['street'].setValue(component.long_name);
          break;
        case 'locality':
          this.registerForm.controls['commune'].setValue(component.long_name);
          break;
        case 'postal_code':
          this.registerForm.controls['zipCode'].setValue(component.long_name);
          break;
      }
    }
  }

  testBtn() {
    console.log(this.registerForm.controls['flavor'].value);
  }

  resetAddress() {
    this.registerForm.controls['addressSearchToken'].reset();
    this.registerForm.controls['houseNumber'].reset();
    this.registerForm.controls['street'].reset();
    this.registerForm.controls['commune'].reset();
    this.registerForm.controls['zipCode'].reset();

  }
}
