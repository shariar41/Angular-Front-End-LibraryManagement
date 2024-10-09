import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Borrower } from '../models/borrower.model';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private baseUrl = 'http://localhost:9090/api/books';

  constructor(private http: HttpClient) {} // Inject HttpClient here

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }
  // Update this method to use query parameters
  getBooksByBorrowerId(borrowerId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/borrowers?borrowerId=${borrowerId}`
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // Add a borrower to a book
  addBorrowerToBook(bookId: number, borrowerId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${bookId}/borrowers/${borrowerId}`,
      {}
    );
  }

  // Remove a borrower from a book
  removeBorrowerFromBook(bookId: number, borrowerId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${bookId}/borrowers/${borrowerId}`
    );
  }

  // Get all authors
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}/authors`);
  }
  // Get all borrowers
  getBorrowers(): Observable<Borrower[]> {
    return this.http.get<Borrower[]>(`${this.baseUrl}/borrowers`);
  }
}
