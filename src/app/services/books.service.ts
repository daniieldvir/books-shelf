import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    }).pipe(
      map(response => {
        if (response?.items) {
          response.items = response.items.map(item => {
            if (item.volumeInfo?.imageLinks) {
              if (item.volumeInfo.imageLinks.thumbnail) {
                item.volumeInfo.imageLinks.thumbnail = item.volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//i, 'https://');
              }
              if (item.volumeInfo.imageLinks.smallThumbnail) {
                item.volumeInfo.imageLinks.smallThumbnail = item.volumeInfo.imageLinks.smallThumbnail.replace(/^http:\/\//i, 'https://');
              }
            }
            return item;
          });
        }
        return response;
      })
    );
  }
}
