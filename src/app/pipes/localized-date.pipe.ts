import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizedDate',
})
export class LocalizedDatePipe implements PipeTransform {
  transform(value: number, pattern: string = 'short'): unknown {
    const date = new Date(value);
    const locale = 'lt-LT';
    return date.toLocaleString(locale);
  }
}
