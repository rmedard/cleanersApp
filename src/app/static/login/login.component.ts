import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../+services/auth.service';
import {User} from '../../+models/user';
import {Router} from '@angular/router';
import {ProfessionalListComponent} from '../../professionals/professional-list/professional-list.component';
import * as _ from 'underscore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alerts: any[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    this.authService.login({
      'username': this.loginForm.controls['username'].value,
      'password': this.loginForm.controls['password'].value
    }).subscribe(data => {
      const loggedInUser = data['user'] as User;
      localStorage.setItem('token', data['token']);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      console.log(loggedInUser.roles);
      if (_.contains(loggedInUser.roles, 'ADMIN')) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/profile']);
      }
    }, () => {
      this.alerts.push(
        {
          type: 'danger',
          msg: 'Oops, login failed',
          dismissible: true
        }
      );
    });
  }

  onClosed(dismissedAlert: ProfessionalListComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
