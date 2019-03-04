import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from '../core/service/note.service';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.css']
})
export class UpdatenoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data, 
    private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  closeClick(note){
    this.noteService.updateNote(note).subscribe(response =>{
      this.snackBar.open("Note updated successfully", "OK", {
        duration: 3000,
      });
    })
    this.dialogRef.close();
  }

  updateArchiveNote(note){
    var newNote = {
      ...note,
      archive :true
    }
    this.noteService.updateNote(newNote).subscribe(response =>{
      this.snackBar.open("Note Archived Successfully", "OK", {
        duration: 3000,
      });
    },
    (error)=>{
      console.log(error);
      this.snackBar.open("Note couldn't archive", "OK", {
        duration: 3000,
      });
    })
  }
}
