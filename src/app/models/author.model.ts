import { Book } from './book.model';

export interface Author {
  id?: number; // Optional
  name: string;
  // email: string;
  books?: Book[];
}
