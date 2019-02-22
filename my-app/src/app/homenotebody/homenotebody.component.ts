import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note.service';

@Component({
  selector: 'app-homenotebody',
  templateUrl: './homenotebody.component.html',
  styleUrls: ['./homenotebody.component.css']
})
export class HomenotebodyComponent implements OnInit {

  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.noteService.retrieveNote();
  }

}
