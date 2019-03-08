import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Note } from '../core/models/Note';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Label } from '../core/models/Label';

@Component({
  selector: 'app-archivenote',
  templateUrl: './archivenote.component.html',
  styleUrls: ['./archivenote.component.css']
})
export class ArchivenoteComponent implements OnInit {

  public notes: Note[] = [];

  public labels:Label[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  public refresh(event) {
    console.log(event.note);
    this.updateNote(event.note);
  }

  private updateNote(note) {
    this.noteService.updateNote(note).subscribe(response => {
      this.getNotes();
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Sorry, something went wrong!", "OK", {
          duration: 3000,
        });
      })
  }

  private getNotes() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }
}
