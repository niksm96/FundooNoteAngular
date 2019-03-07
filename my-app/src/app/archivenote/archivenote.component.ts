import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../core/models/Note';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';

@Component({
  selector: 'app-archivenote',
  templateUrl: './archivenote.component.html',
  styleUrls: ['./archivenote.component.css']
})
export class ArchivenoteComponent implements OnInit {

  public notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
    this.getNotes();
  }


  public updateNote(newNote) {
    this.noteService.updateNote(newNote).subscribe(response => {
      this.getNotes();
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Sorry, something went wrong", "OK", {
          duration: 3000,
        });
      })
  }

  public openDialog(note) {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      height: '200px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getNotes();
    });
  }

  public moveToTrash(note) {
   note.trashed = 1;
    this.updateNote(note)
    this.snackBar.open("Note trashed", "OK", {
      duration: 3000,
    });

  }

  public unArchiveNote(note) {
    note.archive = 0;
    this.updateNote(note);
    this.snackBar.open("Note un-archived", "OK", {
      duration: 3000,
    });
  }

  public pinnedNote(note) {
    note.pinned = 1;
    this.updateNote(note); 
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

  private getNotes() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
    });
  }
}
