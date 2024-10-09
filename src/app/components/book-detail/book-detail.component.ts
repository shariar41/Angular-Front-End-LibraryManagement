import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book!: Book; // Book object to hold the book data

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    const bookId = +this.route.snapshot.paramMap.get('id')!;
    this.libraryService.getBookById(bookId).subscribe({
      next: (data: Book) => {
        this.book = data;
      },
      error: (err) => {
        console.error('Error fetching book:', err);
      },
    });
  }
}
