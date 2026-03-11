import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly now = signal(new Date());
  readonly currentYear = computed(() => this.now().getFullYear());
}
