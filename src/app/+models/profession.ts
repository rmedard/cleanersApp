export interface Profession {
  id: number;
  title: string;
  description: string;
  category: Category;
}

export enum Category {
  Bricolage,
  Construction,
  Cleaning,
  BabySitting
}
