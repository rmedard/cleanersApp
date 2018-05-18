import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl;
  // jwt = new JwtHelper;

  constructor(private http: HttpClient) { }

  public login(credentials: any) {
    return this.http.post(this.baseUrl + '/auth/login', credentials, httpOptions);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    if (this.getToken()) {
       return tokenNotExpired(this.getToken());
    } return false;
  }

}
