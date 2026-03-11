import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import {
  AlertCircle,
  Book,
  BookOpen,
  CalendarDays,
  Eye,
  Globe,
  Hash,
  Heart,
  LoaderCircle,
  LucideAngularModule,
  Search,
  SquarePen,
  Trash2,
  X,
  House,
} from 'lucide-angular';

import { routes } from './app.routes';
import { BooksState } from './state/books.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(
      [BooksState],
      withNgxsStoragePlugin({
        keys: ['books.books', 'books.favorites'],
      }),
    ),
    importProvidersFrom(
      LucideAngularModule.pick({
        CalendarDays,
        SquarePen,
        Trash2,
        X,
        LoaderCircle,
        Search,
        Eye,
        BookOpen,
        Book,
        Globe,
        Hash,
        AlertCircle,
        Heart,
        House,
      }),
    ),
  ],
};
