import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, Store } from '@ngxs/store';
import { LucideAngularModule } from 'lucide-angular';
import { Button } from '../../components/shared/button/button';
import { FormField } from '../../components/shared/form-field/form-field';
import { BookDTO } from '../../models/book.model';
import { BooksActions } from '../../state/books.action';
import { mapBookToForm, mapFormToUpdatedBook } from '../../utils/book-form.mapper';
import { mapFormToNewBook } from '../../utils/create-book.util';

type BookForm = {
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  image: string;
  category: string;
  subtitle: string;
  language: string;
};

@Component({
  selector: 'app-book-form-page',
  imports: [FormsModule, FormField, Button, LucideAngularModule],
  templateUrl: './book-form-page.component.html',
  styleUrl: './book-form-page.component.scss',
})
export class BookFormPageComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly action = inject(Actions);

  private readonly navigation = this.router.currentNavigation();
  private readonly state = this.navigation?.extras.state as { book?: BookDTO } | undefined;

  public pageTitle = computed(() => (this.editBook() ? 'Edit' : 'Add'));
  public editBook = signal<BookDTO | null>(this.state?.book ?? null);
  public error = signal<string | null>(null);

  public form = signal<BookForm>({
    title: '',
    author: '',
    publishedDate: '',
    description: '',
    image: '',
    category: '',
    subtitle: '',
    language: '',
  });

  public isValid = computed(() => {
    const f = this.form();

    return (
      f.title.trim().length > 0 && f.author.trim().length > 0 && f.publishedDate.trim().length > 0
    );
  });

  ngOnInit() {
    this.form.set(mapBookToForm(this.editBook()));
  }

  public handleChange(field: keyof BookForm, value: string) {
    console.log(field, value);
    this.form.set({ ...this.form(), [field]: value });
  }

  public handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.isValid()) {
      this.error.set('Please fill in all required fields.');
      return;
    }

    const current = this.editBook();
    const form = this.form();

    if (current) {
      const updatedBook = mapFormToUpdatedBook(current, form);
      this.store.dispatch(new BooksActions.UpdateBook(updatedBook));
    } else {
      const newBook = mapFormToNewBook(form);
      this.store.dispatch(new BooksActions.AddBook(newBook));
    }

    this.router.navigate(['/']);
  }

  public handleCancel() {
    this.router.navigate(['/']);
  }
}
