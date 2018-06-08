import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../+services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  title = 'Cleaners App';
  loggedInUsername = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUsername = this.authService.getLoggedInUser().username;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
