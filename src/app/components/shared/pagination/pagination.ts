import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [Button],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  readonly page = input<number>(0);
  readonly hasMore = input<boolean>(false);
  readonly pageChange = output<number>();

  nextPage() {
    this.pageChange.emit(this.page() + 1);
  }

  prevPage() {
    this.pageChange.emit(Math.max(0, this.page() - 1));
  }
}
