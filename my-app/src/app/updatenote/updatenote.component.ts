import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from '../core/service/note.service';
import { Label } from '../core/models/Label';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {

  public removable = true;

  public selectedReminder=new Date();

  selectedImage : File;


  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer) { }

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

  public getImage(image, note): any {
    const url = `data:${note.contentType};base64,${image.image}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public onImageEvent(event, note) {
    this.selectedImage = event.target.files[0];
    this.addImage(note);
  }

  public deleteImage(image){
    this.noteService.deleteImage(image.imageId).subscribe((response)=>{
      this.snackBar.open("Image deleted", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Image could not be deleted", "ERROR", {
          duration: 3000,
        });
      })
  }

  private addImage(note) {
    this.noteService.addImages(this.selectedImage, note.noteId).subscribe((response) => {
      this.updateNote(note); 
      this.snackBar.open("Image added", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Image could not be added", "ERROR", {
          duration: 3000,
        });
      })
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
