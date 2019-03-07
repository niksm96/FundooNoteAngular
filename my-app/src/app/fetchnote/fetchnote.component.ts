import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Label } from '../core/models/Label';


@Component({
  selector: 'app-fetchnote',
  templateUrl: './fetchnote.component.html',
  styleUrls: ['./fetchnote.component.css']
})
export class FetchnoteComponent implements OnInit {

  @Input() notes

  @Output() fetchEvent = new EventEmitter();

  public labels: Label[] = [];
  
  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.retrieveLabel();
  }

  public moveToTrash(key, note) {
    note.trashed = 1;
    const data = { key, note };
    this.fetchEvent.emit(data)
    this.snackBar.open("Note trashed", "OK", {
      duration: 3000,
    });

  }

  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      height: '200px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note };
      this.fetchEvent.emit(data);
    });
  }

  public updateArchiveNote(key, note) {
    note.pinned = 0;
    note.archive = 1;
    const data = { key, note };
    this.fetchEvent.emit(data);
    this.snackBar.open("Note archived", "OK", {
      duration: 3000,
    });
  }

  public pinnedNote(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    const data = { key, note };
    this.fetchEvent.emit(data);
    this.snackBar.open("Note pinned", "OK", {
      duration: 3000,
    });
  }

  public removeLabel(labelId, noteId) {
    this.noteService.deleteLabelFromNote(noteId, labelId).subscribe(response => {
      this.snackBar.open("Label removed successfully from note", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Label couldn't be removed", "OK", {
          duration: 3000,
        });
      })
  }

  private retrieveLabel() {
    this.noteService.retrieveLabel().subscribe(label => {
      this.labels = label;
    })
  }

}
