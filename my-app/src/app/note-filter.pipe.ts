import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './core/models/Note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[], valid= ''): Note[] {
    if(!valid){
      return notes.filter((item) => {
        if (!item.archive && !item.trashed && !item.pinned) {
          return item;
        }
      });
    }
    return notes.filter((item) => item[valid]);
  
  }


}
