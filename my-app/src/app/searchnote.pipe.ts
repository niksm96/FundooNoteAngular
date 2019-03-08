import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnote'
})
export class SearchnotePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
