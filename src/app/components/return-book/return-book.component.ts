import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BorrowerService } from '../../services/borrower.service';
import { Borrower } from '../../models/borrower.model';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css',
})
export class ReturnBookComponent implements OnInit {
  returnForm: FormGroup;
  borrowers: Borrower[] = [];
  // borrowerId: undefined;

  constructor(
    private libraryService: LibraryService,
    private borrowerService: BorrowerService, // Service to get authors
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.returnForm = new FormGroup({
      borrowerId: new FormControl('', [Validators.required]), // Field for borrower ID
      bookId: new FormControl('', [Validators.required]), // Field for book ID
    });
  }

  ngOnInit(): void {
    // Get bookId and borrowerId from route parameters

    this.route.params.subscribe((params) => {
      // this.bookId = +params['bookId'];
      this.returnForm.patchValue({
        bookId: params['bookId'], // Set the borrowerId in the form
      });
      // this.borrowerId = +params['borrowerId']; // You can pass borrowerId dynamically if needed
    });
    this.loadBorrowers();
  }
  loadBorrowers() {
    this.borrowerService
      .getBorrowersByBookId(this.returnForm.value.bookId)
      .subscribe((data: Borrower[]) => {
        this.borrowers = data;
        console.log('data: ', data);
      });
  }

  returnBook(): void {
    if (this.returnForm.valid) {
      const formData = this.returnForm.value;
      const borrowerId = formData.borrowerId;
      const bookId = formData.bookId;

      // API call to borrow the book
      this.libraryService.removeBorrowerFromBook(bookId, borrowerId).subscribe({
        next: (response) => {
          console.log('Book returned successfully:', response);
          alert('Book returned successfully');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error returning book:', error);
        },
      });
    }
  }

  navigateToLibrary() {
    this.router.navigate(['/books']); // Navigate to AddBookComponent
  }
}
