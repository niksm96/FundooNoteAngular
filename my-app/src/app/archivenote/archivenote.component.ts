import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../core/models/Note';
import { HelperServiceService } from '../core/service/helper-service.service';

@Component({
  selector: 'app-archivenote',
  templateUrl: './archivenote.component.html',
  styleUrls: ['./archivenote.component.css']
})
export class ArchivenoteComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private helperService: HelperServiceService
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }

  updateNote(newNote) {
    this.noteService.updateNote(newNote).subscribe(response => {
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Sorry, something went wrong", "OK", {
          duration: 3000,
        });
      })
  }

  openDialog(note) {
    this.helperService.openDialogService(note);
  }

  moveToTrash(note) {
    var newNote = this.helperService.moveToTrashService(note);
    this.updateNote(newNote)
    this.snackBar.open("Note trashed", "OK", {
      duration: 3000,
    });

  }

  unArchiveNote(note) {
    var newNote = this.helperService.unArchiveNoteService(note)
    this.updateNote(newNote);
    this.snackBar.open("Note un-archived", "OK", {
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
