import { Component, OnInit } from '@angular/core';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private noteService: NoteService
    ) { }

  ngOnInit() {
   this.getNotes();
  }

  getNotes(){
    this.noteService.retrieveNote().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }

  refresh(event){
    if(event){
      this.getNotes;
    }
  }
  

}
