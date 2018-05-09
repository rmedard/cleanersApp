import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Professional} from '../+models/professional';

@Injectable()
export class ProfessionalsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProfessionals() {
    return this.http.get(this.baseUrl + '/professionals');
  }

  getProfessional(id: number) {
    return this.http.get<Professional>(this.baseUrl + '/professionals/' + id);
  }
}
