import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../core/models/Note';
import { TrashdialogComponent } from '../trashdialog/trashdialog.component';
import { KeepHelperService } from '../core/service/keep-helper.service';

@Component({
  selector: 'app-trashnote',
  templateUrl: './trashnote.component.html',
  styleUrls: ['./trashnote.component.scss']
})
export class TrashnoteComponent implements OnInit {

  notes: Note[] = [];

  @Input() grid = false;

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private helper: KeepHelperService
    ) { }

  ngOnInit() {
    this.getNotes();
    this.helper.getTheme().subscribe((response)=>{
      this.grid = response;
    })
  }

  public onDelete(note) {
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.getNotes();
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

  public restore(note) {
   note.trashed = 0;
    this.noteService.updateNote(note).subscribe(response => {
      this.getNotes();
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

  public openDialog(note): void {
    const dialogRef = this.dialog.open(TrashdialogComponent, {
      width: '500px',
      height: '200px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dailog result ${result}');
    });
  }

  private getNotes(){
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }

}
