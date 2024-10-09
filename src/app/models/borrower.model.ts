import { Book } from './book.model';

export interface Borrower {
  id?: number;
  name: string;
  email: string;
  borrowedBooks?: Book[];
}
