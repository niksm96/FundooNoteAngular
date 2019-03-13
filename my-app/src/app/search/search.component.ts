import { Component, OnInit } from '@angular/core';
import { KeepHelperService } from '../core/service/keep-helper.service';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar } from '@angular/material';
import { Note } from '../core/models/Note';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public notes: Note[] = [];

  public grid = false;

  public searchInput = '';

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private helper: KeepHelperService
  ) { }

  ngOnInit() {
    this.getNotes();
    this.helper.getTheme().subscribe((grid) => {
      this.grid = grid;
    })
    this.helper.getSearch().subscribe((searchInput) => {
      this.searchInput = searchInput;
    })

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
