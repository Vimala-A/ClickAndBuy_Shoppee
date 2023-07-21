import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingTextConverter'
})
export class RatingTextConverterPipe implements PipeTransform {

  transform(value:any): string {
    if (value) {
       return `${value} Star Ratings`;
    }
    return '';
  }

}
