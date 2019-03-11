import { Pipe, PipeTransform } from '@angular/core';
import { Label } from './core/models/Label';

@Pipe({
  name: 'searchnote'
})
export class SearchnotePipe implements PipeTransform {
  
  transform(labels:Label[] , searchValue: any): any {
    console.log(labels, searchValue);
    if (!searchValue) {
      return null;
    }
    else {
      return labels.filter(({labelName}) => {
        return labelName.includes(searchValue);
      });
    }
  }
}
