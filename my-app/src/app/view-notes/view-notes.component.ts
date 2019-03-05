import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperServiceService } from '../core/service/helper-service.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private helperService : HelperServiceService
    ) { }

  ngOnInit() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
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

  openDialog(note): void {
   const dialogRef = this.helperService.openDialogService(note);
   dialogRef.afterClosed().subscribe(result => {
    this.noteService.updateNote(note).subscribe(response => {
      this.snackBar.open("Note updated successfully", "OK", {
        duration: 3000,
      });
    })
    console.log('Dailog result ${result}');
  });
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

  pinnedNote(note){
    var newNote = this.helperService.pinnedService(note);
    // note.pinned = 1;
    console.log(newNote);
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Note Pinned Successfully", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Note couldn't be pinned", "OK", {
          duration: 3000,
        });
      })
  }

}
