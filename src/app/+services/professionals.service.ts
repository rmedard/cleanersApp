import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Professional} from '../+models/professional';
import 'rxjs/add/observable/of';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ProfessionalsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProfessionals() {
    return this.http.get<Professional[]>(this.baseUrl + '/professionals');
  }

  createProfessional(professional: Professional) {
    return this.http.post(this.baseUrl + '/professionals', professional, httpOptions);
  }

  addUserToProfessional(professionalId: number, user: any) {
    return this.http.post(this.baseUrl + '/professionals/' + professionalId + '/user', user, httpOptions);
  }

  getProfessional(id: number) {
    return this.http.get(this.baseUrl + '/professionals/' + id).map((response: Response) => {
      const professional = response as Professional;
      professional.expertises.forEach(expertise => {
        expertise.professional = {} as Professional;
        expertise.professional.id = professional.id;
      });
      return professional;
    });
  }

  grantExpertise(id: number, expertise: any) {
    return this.http.post(this.baseUrl + '/professionals/' + id + '/expertises', expertise, httpOptions);
  }

  updateExpertise(id: number, expertise: any) {
    return this.http.put(this.baseUrl + '/professionals/' + id + '/expertises', expertise, httpOptions);
  }
}
