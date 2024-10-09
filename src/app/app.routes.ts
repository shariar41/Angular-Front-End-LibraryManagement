import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BorrowBookComponent } from './components/borrow-book/borrow-book.component';
import { ReturnBookComponent } from './components/return-book/return-book.component';
import { AddBorrowerComponent } from './components/add-borrower/add-borrower.component';

export const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'add-borrower', component: AddBorrowerComponent },
  { path: 'borrow-book/:id', component: BorrowBookComponent },
  { path: 'return-book/:bookId', component: ReturnBookComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
];
