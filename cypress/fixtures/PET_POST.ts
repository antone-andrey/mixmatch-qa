export interface Pet {
  category:  Category;
  id: number;
  name:      string;
  photoUrls: string[];
  tags?:      Category[];
  status:    string;
}

export interface Category {
  id:   number;
  name: string;
}

export enum Status {
  available = "available",
  pending = "pending",
  sold = "sold"
}