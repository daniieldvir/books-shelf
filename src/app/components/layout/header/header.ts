import { Location } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);

  public handleNavigateToHome() {
    this.router.navigate(['/']);
  }

  public handleNavigateToFavorites() {
    this.router.navigate(['/favorites']);
  }
}
