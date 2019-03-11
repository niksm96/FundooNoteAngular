import { Component, OnInit, Input } from '@angular/core';
import { KeepHelperService } from '../core/service/keep-helper.service';
import { NoteService } from '../core/service/note.service';
import { Note } from '../core/models/Note';

@Component({
  selector: 'app-searchnote',
  templateUrl: './searchnote.component.html',
  styleUrls: ['./searchnote.component.css']
})
export class SearchnoteComponent implements OnInit {

  public notes: Note[] = [];
  public searchInput = '';

  constructor(
    private helperService: KeepHelperService,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    this.getNotes();
    this.helperService.getSearchBar().subscribe((response => {
      this.searchInput = response;
    }))
  }

  private getNotes() {
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
    });
  }
}
