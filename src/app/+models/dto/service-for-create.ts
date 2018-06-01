import {ExpertiseForServiceCreate} from './expertise-for-service-create';

export interface ServiceForCreate {
  customerId: number;
  expertiseForServiceCreate: ExpertiseForServiceCreate;
  startTime: Date;
  duration: number;
}
