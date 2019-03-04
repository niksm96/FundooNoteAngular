import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdatenoteComponent } from 'src/app/updatenote/updatenote.component';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialogService(note) {
    return this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      height: '200px',
      data: note
    });
  }

  updateArchiveNoteService(note) {
    return {
      ...note,
      archive: true
    }
  }

  moveToTrashService(note){
    return {
      ...note,
      trashed : true
    }
  }

  restoreService(note){
    return {
      ...note,
      trashed : false
    }
  }

  pinnedService(note){
    return {
      ...note,
      pinned : true
    }
  }

}
