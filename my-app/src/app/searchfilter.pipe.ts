import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './core/models/Note';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(notes:Note[] , searchInput: string): any {
    console.log(notes, searchInput);
    if (!searchInput) {
      return null;
    }
    else {
      return notes.filter(({title}) => {
        return title.includes(searchInput);
      });
    }
  }
}
