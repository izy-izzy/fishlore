import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): any {
    const tail:string = '...';
    if (value) {
      if (value.length > limit + tail.length) {
        return value.substring(0, limit - 3) + tail;
      } else {
        return value.substring(0, limit);
      }
    } else {
      return '';
    }
  }

}