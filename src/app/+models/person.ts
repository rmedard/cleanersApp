import {Address} from './address';

export interface Person {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: Address;
}
