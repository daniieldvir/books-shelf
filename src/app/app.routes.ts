import { Routes } from '@angular/router';
import { BookDetailsPageComponent } from './pages/book-details-page/book-details-page.component';
import { BookFormPageComponent } from './pages/book-form-page/book-form-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Home' },
  { path: 'favorites', component: FavoritesPageComponent, title: 'Favorites' },
  { path: 'book/:id', component: BookDetailsPageComponent, title: 'Book Details' },
  { path: 'books/new', component: BookFormPageComponent, title: 'New Book' },
  { path: 'book/:id/edit', component: BookFormPageComponent, title: 'Edit Book' },
];
