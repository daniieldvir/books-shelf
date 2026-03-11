import { createPropertySelectors } from '@ngxs/store';
import { BooksState, BooksStateModel } from './books.state';

export class BooksSelectors {
  static slices = createPropertySelectors<BooksStateModel>(BooksState);
}
