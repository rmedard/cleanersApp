import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tokenNotExpired} from 'angular2-jwt';
import {User} from '../+models/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public login(credentials: any) {
    return this.http.post(this.baseUrl + '/auth/login', credentials, httpOptions);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    if (this.getToken()) {
      return tokenNotExpired('token');
    }
    return false;
  }

  getLoggedInUser() {
    if (this.loggedIn()) {
      return JSON.parse(localStorage.getItem('user')) as User;
    } else {
      return null;
    }
  }

}
