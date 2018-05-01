import {User} from './user';
import {Person} from './person';

export interface Customer extends Person {
  id: number;
  regNumber: string;
  user: User;
}
