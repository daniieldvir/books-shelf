import { BookDTO } from '../models/book.model';

export namespace BooksActions {
  export class LoadBooks {
    static readonly type = '[Books] Load Books';
    constructor(
      public readonly query: string,
      public readonly page: number = 0,
    ) {}
  }

  export class DeleteBook {
    static readonly type = '[Books] Delete Book';
    constructor(public readonly bookId: string) {}
  }

  export class UpdateBook {
    static readonly type = '[Books] Update Book';
    constructor(public readonly book: Partial<BookDTO>) {}
  }

  export class AddBook {
    static readonly type = '[Books] Add Book';
    constructor(public readonly book: Partial<BookDTO>) {}
  }

  export class AddToFavorites {
    static readonly type = '[Books] Add to Favorites';
    constructor(public readonly book: BookDTO) {}
  }

  export class RemoveFromFavorites {
    static readonly type = '[Books] Remove from Favorites';
    constructor(public readonly bookId: string) {}
  }
}
