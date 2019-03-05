import { Component, OnInit } from '@angular/core';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperServiceService } from '../core/service/helper-service.service';

@Component({
  selector: 'app-pinnednote',
  templateUrl: './pinnednote.component.html',
  styleUrls: ['./pinnednote.component.css']
})
export class PinnednoteComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar, 
    private helperService : HelperServiceService
    ) { }

  ngOnInit() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }

  openDialog(note){
    this.helperService.openDialogService(note);
  }
  
  moveToTrash(note) {
    var newNote = this.helperService.moveToTrashService(note);
    this.noteService.updateNote(newNote).subscribe(response => {
      console.log("Trash become true");
      this.snackBar.open("Note trashed", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Note trashed failed", "OK", {
          duration: 3000,
        });
      })
  }

  updateArchiveNote(note) {
    var newNote = this.helperService.updateArchiveNoteService(note)
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Note Archived Successfully", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Note couldn't be archived", "OK", {
          duration: 3000,
        });
      })
  }

  unPinNote(note){
    var newNote = this.helperService.unPinService(note);
    // note.pinned = 0;
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Note Unpinned Successfully", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Note couldn't be unpinned", "OK", {
          duration: 3000,
        });
      })
  }
}
