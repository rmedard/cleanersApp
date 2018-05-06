import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Email} from '../+models/email';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class EmailsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  sendEmail(email: Email) {
    return this.http.post(this.baseUrl + '/mails', email, httpOptions);
  }

  getEmails() {
    return this.http.get<Email[]>(this.baseUrl + '/mails');
  }
}
