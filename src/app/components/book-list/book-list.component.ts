import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../services/library.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private libraryService: LibraryService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.libraryService.getBooks().subscribe((books) => {
      this.books = books;
      console.log(this.books);
    });
  }

  deleteBook(id: number) {
    this.libraryService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }
  navigateToAddBook() {
    this.router.navigate(['/add-book']); // Navigate to AddBookComponent
  }
  navigateToAddBorrower() {
    this.router.navigate(['/add-borrower']); // Navigate to AddBookComponent
  }
  goToReturnBookPage(bookId: any) {
    // Navigate with query parameters
    this.router.navigate(['/return-book', bookId]);
  }
  goToBorrowBookPage(bookId: any) {
    // Navigate with query parameters
    this.router.navigate(['/borrow-book', bookId]);
  }
}
