import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Button } from '../../components/shared/button/button';
import { BookDTO } from '../../models/book.model';

@Component({
  selector: 'app-book-details-page',
  standalone: true,
  imports: [CommonModule, Button, LucideAngularModule],
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.scss',
})
export class BookDetailsPageComponent {
  private readonly router = inject(Router);

  private readonly navigation = this.router.currentNavigation();
  private readonly state = this.navigation?.extras.state as { book?: BookDTO } | undefined;

  book = signal<BookDTO | null>(this.state?.book ?? null);

  public navigateBack() {
    this.router.navigate(['/']);
  }
}
