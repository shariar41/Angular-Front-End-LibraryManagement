import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-borrower-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './borrower-list.component.html',
  styleUrl: './borrower-list.component.css',
})
export class BorrowerListComponent {
  title = 'Borrower list';
}
