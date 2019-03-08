import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from '../core/service/note.service';
import { Label } from '../core/models/Label';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

  public removable = true;


  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public closeClick(note) {
    this.updateNote(note);
    this.snackBar.open("Note updated successfully", "OK", {
      duration: 3000,
    });
    this.dialogRef.close();
  }

  public updateArchiveNote(note) {
    note.archive = 1;
    note.pinned = 0;
    this.updateNote(note);
    this.snackBar.open("Note updated successfully", "OK", {
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

  public unPinNote(note){
    note.pinned = 0;
    this.updateNote(note);
    this.snackBar.open("Note un-pinned", "OK", {
      duration: 3000,
    });
  }

  addLabelToNote(data){
    this.updateNote(data.note);

  }

  private updateNote(note) {
    this.noteService.updateNote(note).subscribe(response => {
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Sorry ,Something went wrong!", "OK", {
          duration: 3000,
        });
      })
  }

}
