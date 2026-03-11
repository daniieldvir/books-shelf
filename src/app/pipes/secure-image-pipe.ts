import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secureImage',
  standalone: true
})
export class SecureImagePipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) return '';
    return value.replace(/^http:\/\//i, 'https://');
  }
}
