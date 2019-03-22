import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from '../core/service/note.service';
import { Label } from '../core/models/Label';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {

  public removable = true;

  public selectedReminder=new Date();


  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

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

  public addLabelToNote(data){
    this.updateNote(data.note);
  }

  public updateReminder(note,reminder){
    note.reminder=reminder;
    this.updateNote(note); 
    this.snackBar.open("Note Reminder Set", "OK", {
      duration: 3000,
    });
  }

  public removeReminder(note){
    note.reminder=null;
    this.updateNote(note); 
    this.snackBar.open("Reminder Removed", "OK", {
      duration: 3000,
    });
  }

  public openCollaborator(note): void {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '750px',
      height: '400px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateNote(note); 
      console.log("Dialog closed!");
    });
  }

  public updateColor(data){
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
