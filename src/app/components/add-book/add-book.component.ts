import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { LibraryService } from '../../services/library.service';
import { CommonModule } from '@angular/common';
import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  authors: Author[] = [];
  isAddingNewAuthor: boolean = false;
  newAuthorControl: FormControl; // FormControl for new author

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private authorService: AuthorService, // Service to get authors
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      publishedDate: ['', Validators.required],
      genre: ['', Validators.required],
      authorId: ['', Validators.required],
    });
    // Initialize the new author control
    this.newAuthorControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAllAuthors().subscribe((data: Author[]) => {
      this.authors = data;
      console.log('data: ', data);
    });
  }
  onAuthorSelect(event: any) {
    if (event.target.value === 'add-new') {
      this.isAddingNewAuthor = true;
      this.bookForm.patchValue({ authorId: null }); // Clear the authorId
    } else {
      this.isAddingNewAuthor = false;
    }
  }

  addNewAuthor() {
    if (this.newAuthorControl.valid) {
      const newAuthor: Author = {
        name: this.newAuthorControl.value,
        books: [],
      };
      this.authorService.addAuthor(newAuthor).subscribe((response) => {
        this.authors.push(response);
        this.bookForm.patchValue({ authorId: response.id }); // Set the new author as the selected author
        this.newAuthorControl.reset(); // Reset the new author control
        this.isAddingNewAuthor = false; // Hide the new author input
        alert('New author has been added successfully');
      });
    } else {
      alert('Please enter a name for the new author.');
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = {
        title: this.bookForm.value.title,
        isbn: this.bookForm.value.isbn,
        publishedDate: this.bookForm.value.publishedDate,
        genre: this.bookForm.value.genre,
        author: this.bookForm.value.authorId,
      };
      this.libraryService.addBook(newBook).subscribe((response) => {
        alert('Book added successfully');
        this.bookForm.reset();
      });
    }
  }
  navigateToLibrary() {
    this.router.navigate(['/books']); // Navigate to AddBookComponent
  }
}
