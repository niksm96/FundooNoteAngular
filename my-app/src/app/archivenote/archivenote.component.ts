import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from '../core/models/Note';

@Component({
  selector: 'app-archivenote',
  templateUrl: './archivenote.component.html',
  styleUrls: ['./archivenote.component.css']
})
export class ArchivenoteComponent implements OnInit {
  
  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      height:'200px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(note).subscribe(response =>{
        this.snackBar.open("Note updated successfully", "OK", {
          duration: 3000,
        });
      })
      console.log('Dailog result ${result}');
    });
  }

  moveToTrash(note) {
    var newNote = {
      "archive": note.archive,
      "description": note.description,
      "title": note.title,
      "trashed": true,
      "noteId": note.noteId,
      "pinned": note.pinned
    }
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
}
