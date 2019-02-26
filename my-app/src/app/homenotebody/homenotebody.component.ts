import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note.service';
import { Note } from '../core/models/Note';

@Component({
  selector: 'app-homenotebody',
  templateUrl: './homenotebody.component.html',
  styleUrls: ['./homenotebody.component.css']
})
export class HomenotebodyComponent implements OnInit {
  
   notes:Note[] = [];
  
  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.noteService.retrieveNote().subscribe(notes => { 
      this.notes = notes;
      console.log(this.notes);
  });
  }

}
