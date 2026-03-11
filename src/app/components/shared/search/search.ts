import { Component, output, signal, input, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search',
  imports: [LucideAngularModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  public initialValue = input<string>('');
  public searchTerm = signal('');

  public hasValue = computed(() => {
    const value = this.searchTerm() || this.initialValue();
    return value.length > 0;
  });

  public searchTermChanged = output<string>();

  onSearchTermChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.searchTermChanged.emit(value);
  }

  onClearSearch() {
    this.searchTerm.set('');
    this.searchTermChanged.emit('');
  }
}
