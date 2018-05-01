import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ProfessionsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProfessions() {
    return this.http.get(this.baseUrl + '/professions');
  }

}
