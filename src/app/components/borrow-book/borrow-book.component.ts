import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { BorrowerService } from '../../services/borrower.service';
import { Borrower } from '../../models/borrower.model';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css',
})
export class BorrowBookComponent implements OnInit {
  borrowForm: FormGroup;
  borrowers: Borrower[] = [];

  constructor(
    private libraryService: LibraryService,
    private borrowerService: BorrowerService, // Service to get authors
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.borrowForm = new FormGroup({
      borrowerId: new FormControl('', [Validators.required]), // Field for borrower ID
      bookId: new FormControl('', [Validators.required]), // Field for book ID
    });
  }
  ngOnInit(): void {
    this.loadBorrowers();
    this.route.paramMap.subscribe((params) => {
      // this.borrowForm.value.borrowerId = Number(params.get('id')); // Get the 'id' from the route parameter
      this.borrowForm.patchValue({
        bookId: Number(params.get('id')), // Set the borrowerId in the form
      });
      console.log(this.borrowForm.value.borrowerId); // Now you have the bookId
    });
  }

  loadBorrowers() {
    this.borrowerService.getAllBorrowers().subscribe((data: Borrower[]) => {
      this.borrowers = data;
      console.log('data: ', data);
    });
  }
  // Method to handle form submission
  onSubmit() {
    if (this.borrowForm.valid) {
      const formData = this.borrowForm.value;
      const borrowerId = formData.borrowerId;
      const bookId = formData.bookId;

      // API call to borrow the book
      this.libraryService.addBorrowerToBook(bookId, borrowerId).subscribe({
        next: (response) => {
          console.log('Book borrowed successfully:', response);
          alert('Book borrowed successfully');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error borrowing book:', error);
        },
      });
    }
  }
  navigateToLibrary() {
    this.router.navigate(['/books']); // Navigate to AddBookComponent
  }
}
