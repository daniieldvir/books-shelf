import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BookDTO } from '../../models/book.model';
import { SecureImagePipe } from '../../pipes/secure-image-pipe';
import { Button } from '../shared/button/button';

@Component({
  selector: 'app-book-card',
  imports: [LucideAngularModule, Button, SecureImagePipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCard {
  readonly book = input<BookDTO>();
  readonly isFavorite = input<boolean>(false);
  readonly editBook = output<BookDTO>();
  readonly deleteBook = output<string>();
  readonly moveToBookDetails = output<BookDTO>();
  readonly toggleFavorite = output<BookDTO>();

  public handleEditBook(book: BookDTO) {
    this.editBook.emit(book);
  }

  public handleDeleteBook(bookId: string) {
    this.deleteBook.emit(bookId);
  }

  public handleMoveToBookDetails(book: BookDTO) {
    this.moveToBookDetails.emit(book);
  }

  public handleToggleFavorite(book: BookDTO) {
    this.toggleFavorite.emit(book);
  }
}
