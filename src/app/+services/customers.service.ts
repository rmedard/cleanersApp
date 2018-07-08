import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Customer} from '../+models/customer';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CustomersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  createCustomer(customer: Customer) {
    return this.http.post(this.baseUrl + '/customers', customer, httpOptions);
  }

  getCustomer(customerId: number) {
    return this.http.get<Customer>(this.baseUrl + '/customers/' + customerId, httpOptions);
  }

  addUserToCustomer(customerId: number, user: any) {
    return this.http.post(this.baseUrl + '/customers/' + customerId + '/user', user, httpOptions);
  }

  getCustomers() {
    return this.http.get<Customer[]>(this.baseUrl + '/customers');
  }
}
