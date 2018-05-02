export interface Profession {
  id: number;
  title: string;
  description: string;
  category: Category;
}

export enum Category {
  Bricolage = 0,
  Construction = 1,
  Cleaning = 2,
  BabySitting = 3
}
