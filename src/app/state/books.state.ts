import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { BookDTO } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { BooksActions } from './books.action';

export interface BooksStateModel {
  books: BookDTO[];
  loading: boolean;
  searchTerm: string;
  page: number;
  favorites: BookDTO[];
}

@Injectable()
@State<BooksStateModel>({
  name: 'books',
  defaults: {
    books: [],
    loading: false,
    searchTerm: '',
    page: 0,
    favorites: [],
  },
})
export class BooksState {
  private readonly booksService = inject(BooksService);

  @Action(BooksActions.LoadBooks)
  loadBooks(ctx: StateContext<BooksStateModel>, action: BooksActions.LoadBooks) {
    const state = ctx.getState();

    if (state.searchTerm === action.query && state.page === action.page && state.books.length > 0) {
      return;
    }

    ctx.patchState({
      loading: true,
      searchTerm: action.query,
      page: action.page,
    });

    const pageSize = 20;
    const startIndex = action.page * pageSize;

    return this.booksService.loadBooks(action.query, startIndex, pageSize).pipe(
      tap((data) => {
        const mergedBooks = data.items ?? [];
        ctx.patchState({
          books: mergedBooks,
          loading: false,
        });
      }),
      catchError((error) => {
        console.error('Failed to load books', error);

        ctx.patchState({
          loading: false,
          books: [],
        });

        return of(null);
      }),
    );
  }

  @Action(BooksActions.DeleteBook)
  deleteBook(ctx: StateContext<BooksStateModel>, action: BooksActions.DeleteBook) {
    const state = ctx.getState();
    const updatedBooks = state.books.filter((book) => book.id !== action.bookId);

    ctx.patchState({
      books: updatedBooks,
    });
  }

  @Action(BooksActions.UpdateBook)
  updateBook(ctx: StateContext<BooksStateModel>, action: BooksActions.UpdateBook) {
    const state = ctx.getState();
    const updatedBooks = state.books.map((book) =>
      book.id === action.book.id ? { ...book, ...action.book } : book,
    );

    ctx.patchState({
      books: updatedBooks,
    });
  }

  @Action(BooksActions.AddBook)
  addBook(ctx: StateContext<BooksStateModel>, action: BooksActions.AddBook) {
    const state = ctx.getState();
    const updatedBooks = [action.book as BookDTO, ...state.books];

    ctx.patchState({
      books: updatedBooks,
    });
  }

  @Action(BooksActions.AddToFavorites)
  addToFavorites(ctx: StateContext<BooksStateModel>, action: BooksActions.AddToFavorites) {
    const state = ctx.getState();

    if (state.favorites.some((book) => book.id === action.book.id)) {
      return;
    }

    ctx.patchState({
      favorites: [action.book, ...state.favorites],
    });
  }

  @Action(BooksActions.RemoveFromFavorites)
  removeFromFavorites(
    ctx: StateContext<BooksStateModel>,
    action: BooksActions.RemoveFromFavorites,
  ) {
    const state = ctx.getState();
    const updatedFavorites = state.favorites.filter((book) => book.id !== action.bookId);

    ctx.patchState({
      favorites: updatedFavorites,
    });
  }
}
