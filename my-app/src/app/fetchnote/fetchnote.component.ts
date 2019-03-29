import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fetchnote',
  templateUrl: './fetchnote.component.html',
  styleUrls: ['./fetchnote.component.scss'],
})
export class FetchnoteComponent implements OnInit {

  public removable = true;

  min = new Date();

  selectedReminder = new Date();

  selectedImage: File;

  @Input() message;

  @Input() notes

  @Input() grid = false

  @Output() fetchEvent = new EventEmitter();

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

  }

  public moveToTrash(key, note) {
    note.trashed = 1;
    const data = { key, note };
    this.fetchEvent.emit(data)
    this.snackBar.open("Note trashed", "OK", {
      duration: 3000,
    });

  }

  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note };
      this.fetchEvent.emit(data);
    });
  }

  public updateArchiveNote(key, note) {
    note.pinned = 0;
    note.archive = key == 'archive' ? 1 : 0;
    const data = { key, note };
    this.fetchEvent.emit(data);
    this.snackBar.open("Note archived", "OK", {
      duration: 3000,
    });
  }

  public pinnedNote(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    const data = { key, note };
    this.fetchEvent.emit(data);
    this.snackBar.open("Note pinned", "OK", {
      duration: 3000,
    });
  }

  public removeLabel(labelId, note) {
    this.noteService.deleteLabelFromNote(note.noteId, labelId).subscribe(response => {
      const data = { note };
      this.fetchEvent.emit(data);
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

  public addLabelToNote(data) {
    this.fetchEvent.emit(data);
  }

  public openCollaborator(note): void {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '650px',
      height: '300px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note };
      this.fetchEvent.emit(data);
      console.log("Dialog closed!");
    });
  }

  public updateColor(data) {
    this.fetchEvent.emit(data);
  }

  public updateReminder(note, reminder) {
    note.reminder = reminder;
    const data = { note };
    this.fetchEvent.emit(data);
  }

  public removeReminder(note) {
    note.reminder = null;
    console.log(note.reminder)
    const data = { note };
    this.fetchEvent.emit(data);
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

  private addImage(note) {
    this.noteService.addImages(this.selectedImage, note.noteId).subscribe((response) => {
      const data = {note};
      this.fetchEvent.emit(data);
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

}
