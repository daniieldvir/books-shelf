import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  readonly label = input<string>();
  readonly type = input<string>('text');
  readonly value = input<string>();
  readonly isTextarea = input<boolean>(false);
  readonly error = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly onChange = output<string>();

  public handleOnChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange.emit(value);
  }
}
