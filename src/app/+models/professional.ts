import {User} from './user';
import {Person} from './person';
import {Expertise} from './expertise';

export interface Professional extends Person {
  id?: number;
  regNumber?: string;
  expertises?: Expertise[];
  user: User;
}
