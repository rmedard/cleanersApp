import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../+services/auth.service';
import {User} from '../../+models/user';
import {Router} from '@angular/router';
import {ProfessionalListComponent} from '../../professionals/professional-list/professional-list.component';

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
      localStorage.setItem('token', data['token']);
      localStorage.setItem('user', JSON.stringify(data['user'] as User));
      this.router.navigate(['/dashboard']);
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
