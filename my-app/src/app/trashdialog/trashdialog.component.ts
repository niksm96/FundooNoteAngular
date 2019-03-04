import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from '../core/service/note.service';
import { HelperServiceService } from '../core/service/helper-service.service';

@Component({
  selector: 'app-trashdialog',
  templateUrl: './trashdialog.component.html',
  styleUrls: ['./trashdialog.component.css']
})
export class TrashdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TrashdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private helperService : HelperServiceService) { }


  ngOnInit() {
  }

  onDelete(note) {
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.snackBar.open("Note deleted successfully", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Note couldn't be Restored", "OK", {
          duration: 3000,
        });
      })
    this.dialogRef.close();
  }

  restore(note) {
    var newNote = this.helperService.restoreService(note);
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Note Restored Successfully", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Note couldn't be Restored", "OK", {
          duration: 3000,
        });
      })
    this.dialogRef.close();
  }

}
