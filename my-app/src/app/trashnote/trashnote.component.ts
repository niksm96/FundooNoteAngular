import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../core/models/Note';
import { TrashdialogComponent } from '../trashdialog/trashdialog.component';
import { HelperServiceService } from '../core/service/helper-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-trashnote',
  templateUrl: './trashnote.component.html',
  styleUrls: ['./trashnote.component.css']
})
export class TrashnoteComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private helperService: HelperServiceService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(){
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
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
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(TrashdialogComponent, {
      width: '500px',
      height: '200px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dailog result ${result}');
    });
  }

}
