import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Profession} from '../+models/profession';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ProfessionsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProfessions() {
    return this.http.get<Profession[]>(this.baseUrl + '/professions');
  }

  createProfession(profession: Profession) {
    return this.http.post<Profession>(this.baseUrl + '/professions', profession, httpOptions);
  }

  updateProfession(profession: Profession, id: number) {
    return this.http.put(this.baseUrl + '/professions/' + id, profession, httpOptions);
  }
}
