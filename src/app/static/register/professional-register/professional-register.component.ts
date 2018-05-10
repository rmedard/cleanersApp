import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfessionalsService} from '../../../+services/professionals.service';

@Component({
  selector: 'app-professional-register',
  templateUrl: './professional-register.component.html',
  styleUrls: ['./professional-register.component.css']
})
export class ProfessionalRegisterComponent implements OnInit {

  registerForm: FormGroup;
  attachedUser: false;

  constructor(private formBuilder: FormBuilder, private professionalsService: ProfessionalsService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
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
}
