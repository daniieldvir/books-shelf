import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngxs/store';
import { LucideAngularModule } from 'lucide-angular';
import { BookDTO } from '../../models/book.model';
import { BooksActions } from '../../state/books.action';
import { BooksSelectors } from '../../state/books.selector';
import { BookCard } from '../book-card/book-card';
import { Popup } from '../shared/popup/popup';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCard, Popup, LucideAngularModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookList {
  readonly books = input<BookDTO[]>([]);
  readonly loading = input<boolean>(false);

  protected isDeletePopupOpen = signal(false);
  protected selectedBookId: string | null = null;
  protected favorites = select(BooksSelectors.slices.favorites);

  private readonly store = inject(Store);
  private readonly router = inject(Router);

  public handleMoveToBookDetails(book: BookDTO) {
    this.router.navigate(['/book', book.id], { state: { book } });
  }

  public handleEditBook(book: BookDTO) {
    this.router.navigate(['/book', book.id, 'edit'], { state: { book } });
  }

  public handleOpenDeletePopup(bookId: string) {
    console.log(bookId);
    this.isDeletePopupOpen.set(true);
    this.selectedBookId = bookId;
  }

  public handleDeleteBook() {
    console.log(this.selectedBookId);
    if (!this.selectedBookId) return;
    this.store.dispatch(new BooksActions.DeleteBook(this.selectedBookId));
    this.isDeletePopupOpen.set(false);
    this.selectedBookId = null;
  }

  public checkFavorite(bookId: string): boolean {
    const favs = this.favorites();
    return favs ? favs.some((fav: BookDTO) => fav.id === bookId) : false;
  }

  public handleToggleFavorite(book: BookDTO) {
    if (this.checkFavorite(book.id)) {
      this.store.dispatch(new BooksActions.RemoveFromFavorites(book.id));
    } else {
      this.store.dispatch(new BooksActions.AddToFavorites(book));
    }
  }
}
