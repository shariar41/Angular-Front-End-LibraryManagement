import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Borrower } from '../../models/borrower.model';
import { BorrowerService } from '../../services/borrower.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-borrower',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-borrower.component.html',
  styleUrl: './add-borrower.component.css',
})
export class AddBorrowerComponent implements OnInit {
  borrowerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private borrowerService: BorrowerService,
    private router: Router
  ) {
    this.borrowerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.borrowerForm.valid) {
      const newBorrower: Borrower = {
        name: this.borrowerForm.value.name,
        email: this.borrowerForm.value.email,
      };
      this.borrowerService.addBorrower(newBorrower).subscribe((response) => {
        alert('Borrower added successfully');
        this.borrowerForm.reset();
      });
    }
  }

  navigateToLibrary() {
    this.router.navigate(['/books']);
  }
}
