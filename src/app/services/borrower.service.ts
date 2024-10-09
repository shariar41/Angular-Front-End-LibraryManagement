import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrower } from '../models/borrower.model';

@Injectable({
  providedIn: 'root',
})
export class BorrowerService {
  private apiUrl = 'http://localhost:9090/api/borrowers';

  constructor(private http: HttpClient) {}

  getAllBorrowers(): Observable<Borrower[]> {
    return this.http.get<Borrower[]>(this.apiUrl);
  }

  getBorrowerById(id: number): Observable<Borrower> {
    return this.http.get<Borrower>(`${this.apiUrl}/${id}`);
  }

  getBorrowersByBookId(bookId: number): Observable<Borrower[]> {
    console.log('book ID is:', bookId);
    const params = new HttpParams().set('bookId', bookId); // Add query params
    return this.http.get<Borrower[]>(`${this.apiUrl}/returners`, { params });
  }

  addBorrower(borrower: Borrower): Observable<Borrower> {
    return this.http.post<Borrower>(this.apiUrl, borrower);
  }
  // Method to delete a book by its ID
  deleteBook(bookId: number): Observable<void> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<void>(url); // Expecting no return value (void) after deletion
  }
}
