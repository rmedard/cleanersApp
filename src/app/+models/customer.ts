import {User} from './user';
import {Person} from './person';
import {Service} from './service';

export interface Customer extends Person {
  id: number;
  regNumber?: string;
  orders?: Service[];
  user?: User;
}
