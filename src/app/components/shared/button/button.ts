import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button',
  imports: [LucideAngularModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly label = input<string>();
  readonly icon = input<{ name: string; size: string }>();
  readonly disabled = input<boolean>(false);
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly onClick = output<void>();

  public handleClick() {
    this.onClick.emit();
  }
}
