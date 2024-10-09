import { Author } from './author.model';
import { Borrower } from './borrower.model';

export interface Book {
  id?: number;
  title: string;
  author: Author;
  isbn: string;
  publishedDate: Date;
  genre: string;
  borrowers?: Borrower[];
}
