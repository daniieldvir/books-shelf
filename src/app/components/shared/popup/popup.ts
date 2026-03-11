import { CommonModule } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Button } from '../button/button';

@Component({
  selector: 'app-popup',
  imports: [Button, CommonModule, LucideAngularModule],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
  readonly title = input<string>();
  readonly actionLabel = input<string>();
  readonly isOpen = model<boolean>(false);
  readonly onSave = output<void>();

  public handleSave() {
    this.onSave.emit();
  }

  public handleCancel() {
    this.isOpen.set(false);
  }
}
