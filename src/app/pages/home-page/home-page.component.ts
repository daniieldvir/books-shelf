import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { select, Store } from '@ngxs/store';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { BookList } from '../../components/book-list/book-list';
import { Button } from '../../components/shared/button/button';
import { Pagination } from '../../components/shared/pagination/pagination';
import { Search } from '../../components/shared/search/search';
import { BooksActions } from '../../state/books.action';
import { BooksSelectors } from '../../state/books.selector';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, BookList, Search, LucideAngularModule, Button, Pagination],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  protected readonly books = select(BooksSelectors.slices.books);
  protected readonly loading = select(BooksSelectors.slices.loading);

  protected readonly searchTerm = signal(
    this.store.selectSnapshot(BooksSelectors.slices.searchTerm) || '',
  );

  protected readonly page = signal(this.store.selectSnapshot(BooksSelectors.slices.page) || 0);

  private readonly search$ = toObservable(this.searchTerm).pipe(
    debounceTime(500),
    distinctUntilChanged(),
  );

  constructor() {
    this.search$.subscribe((term) => {
      this.page.set(0);
      this.store.dispatch(new BooksActions.LoadBooks(term, this.page()));
    });
  }

  public ngOnInit(): void {
    this.store.dispatch(new BooksActions.LoadBooks(this.searchTerm(), this.page()));
  }

  public onSearchTermChanged(term: string) {
    this.searchTerm.set(term);
  }

  public onPageChanged(newPage: number) {
    this.page.set(newPage);
    this.store.dispatch(new BooksActions.LoadBooks(this.searchTerm(), this.page()));
  }

  public handleAddBook() {
    this.router.navigate(['/books/new'], { state: { searchTerm: this.searchTerm() } });
  }
}
