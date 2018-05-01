import {Expertise} from './expertise';
import {Customer} from './customer';

export interface Service {
  id: number;
  expertise: Expertise;
  customer: Customer;
  startTime: Date;
  duration: number;
  totalCost: number;
  status: Status;
}

export enum Status {
  Initiated,
  Accepted,
  Rejected,
  Done
}
