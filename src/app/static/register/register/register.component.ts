import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfessionalsService} from '../../../+services/professionals.service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {CustomersService} from '../../../+services/customers.service';

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

  constructor(private formBuilder: FormBuilder,
              private professionalsService: ProfessionalsService,
              private customersService: CustomersService) { }

  ngOnInit() {
    this.flavor = 'Customer';
    this.registerForm = this.formBuilder.group({
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
    if (this.attachedUser) {

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
    this.registerForm.reset();
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
}
