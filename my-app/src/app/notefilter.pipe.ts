import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './core/models/Note';

@Pipe({
  name: 'notefilter'
})
export class NotefilterPipe implements PipeTransform {

  transform(notes: Note[], valid = ''): Note[] {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.archive && !item.trashed && !item.pinned) {
          return item;
        }
      });
    }
    else if (valid === 'archive') {
      return notes.filter((item) => {
        if (item.archive && !item.trashed && !item.pinned) {
          return item;
        }
      });
    }
    else if (valid === 'pinned') {
      return notes.filter((item) => {
        if (!item.trashed && item.pinned ) {
          return item;
        }
      });
    }
    else if (valid === 'trashed') {
      return notes.filter((item) => {
        if (item.trashed) {
          return item;
        }
      });
    }
    return null;

  }

}
