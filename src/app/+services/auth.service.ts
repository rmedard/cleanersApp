import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelper} from 'angular2-jwt';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl;
  jwt = new JwtHelper;

  constructor(private http: HttpClient) { }

  public login(credentials: any) {
    return this.http.post(this.baseUrl + '/auth/login', credentials, httpOptions);
  }

  // public jwtHelper() {
  //   const decodedToken = this.jwt.decodeToken('token');
  //   const expirationDate = this.jwt.getTokenExpirationDate('token');
  //   const isExpired = this.jwt.isTokenExpired('token');
  //   return this.jwt;
  // }

  loggedIn() {
    if (localStorage.getItem('token')) {
      return !this.jwt.isTokenExpired(localStorage.getItem('token'));
    } return false;
  }

}
