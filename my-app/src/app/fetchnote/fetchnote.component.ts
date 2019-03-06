import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperServiceService } from '../core/service/helper-service.service';


@Component({
  selector: 'app-fetchnote',
  templateUrl: './fetchnote.component.html',
  styleUrls: ['./fetchnote.component.css']
})
export class FetchnoteComponent implements OnInit {

  selectable = true;
  removable = true;
  addOnBlur = true;

  @Input() notes

  @Output() fetchEvent = new EventEmitter();

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private helperService: HelperServiceService,
    private labelService: NoteService
  ) { }

  ngOnInit() {
    
  }

  updateNote(newNote) {
    this.noteService.updateNote(newNote).subscribe(response => {
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Sorry, something went wrong!", "OK", {
          duration: 3000,
        });
      })
  }

  moveToTrash(note) {
    var newNote = this.helperService.moveToTrashService(note);
    this.updateNote(newNote);
    this.snackBar.open("Note trashed", "OK", {
      duration: 3000,
    });

  }

  openDialog(note): void {
    const dialogRef = this.helperService.openDialogService(note);
    dialogRef.afterClosed().subscribe(result => {
      this.updateNote(note);
      console.log('Dailog result ${result}');
    });
  }

  updateArchiveNote(note) {
    var newNote = this.helperService.updateArchiveNoteService(note)
    this.updateNote(newNote);
    this.snackBar.open("Note archived", "OK", {
      duration: 3000,
    });
  }

  pinnedNote(note) {
    var newNote = this.helperService.pinnedService(note);
    this.updateNote(newNote);
    this.snackBar.open("Note pinned", "OK", {
      duration: 3000,
    });
  }

  removeLabel(labelId, noteId) {
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

}
