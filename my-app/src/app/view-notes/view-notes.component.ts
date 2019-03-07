import { Component, OnInit } from '@angular/core';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {

  public notes: Note[] = [];

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

  private updateNote(newNote) {
    this.noteService.updateNote(newNote).subscribe(response => {
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
