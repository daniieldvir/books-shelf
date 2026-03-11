import { Component } from '@angular/core';
import { select } from '@ngxs/store';
import { BookList } from '../../components/book-list/book-list';
import { BooksSelectors } from '../../state/books.selector';

@Component({
  selector: 'app-favorites-page',
  imports: [BookList],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
})
export class FavoritesPageComponent {
  protected readonly favorites = select(BooksSelectors.slices.favorites);
}
