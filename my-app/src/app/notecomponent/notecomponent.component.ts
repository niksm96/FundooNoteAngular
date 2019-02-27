import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';

@Component({
  selector: 'app-notecomponent',
  templateUrl: './notecomponent.component.html',
  styleUrls: ['./notecomponent.component.css']
})
export class NotecomponentComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService,
    private snackBar: MatSnackBar, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }

  onDelete(note) {
    this.noteService.deleteNote(note).subscribe(response => {
      this.snackBar.open("Note deleted successfully", "OK", {
        duration: 3000,
      });
    })
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '250px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
