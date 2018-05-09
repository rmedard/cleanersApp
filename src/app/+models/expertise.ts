import {Profession} from './profession';
import {Professional} from './professional';

export interface Expertise {
  profession: Profession;
  professional: Professional;
  unitPrice: number;
}
