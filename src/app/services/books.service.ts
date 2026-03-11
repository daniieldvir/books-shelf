import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment.prod';
import { BooksResponse } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.booksApiUrl;

  loadBooks(query: string, startIndex = 0, maxResults = 20): Observable<BooksResponse> {
    const normalizedQuery = query?.trim() || 'books';

    return this.http.get<BooksResponse>(this.baseUrl, {
      params: {
        q: normalizedQuery,
        printType: 'books',
        startIndex,
        maxResults,
      },
    });
  }
}
