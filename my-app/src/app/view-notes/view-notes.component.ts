import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar } from '@angular/material';
import { Label } from '../core/models/Label';
import { KeepHelperService } from '../core/service/keep-helper.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit{

  public notes: Note[] = [];

  public labels:Label[] = [];

  public grid = false;

  constructor(
    private noteService: NoteService,
    private snackBar : MatSnackBar,
    private helper: KeepHelperService
  ) { }

  ngOnInit() {
    this.getNotes();
    this.helper.getTheme().subscribe((res) => {
      this.grid = res;
    });
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
