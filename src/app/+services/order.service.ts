import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServiceForCreate} from '../+models/dto/service-for-create';
import {Service} from '../+models/service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class OrderService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: ServiceForCreate) {
    return this.http.post<Service>(this.baseUrl + '/services', order, httpOptions);
  }

}
