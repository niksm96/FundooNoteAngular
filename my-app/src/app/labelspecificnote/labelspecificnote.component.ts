import { Component, OnInit } from '@angular/core';
import { Label } from '../core/models/Label';
import { Note } from '../core/models/Note';
import { notEqual } from 'assert';
import { NoteService } from '../core/service/note.service';

@Component({
  selector: 'app-labelspecificnote',
  templateUrl: './labelspecificnote.component.html',
  styleUrls: ['./labelspecificnote.component.scss']
})
export class LabelspecificnoteComponent implements OnInit {

  labels:Label[]=[];

  notes:Note[]=[];

  labelNotes : Note[]=[];

  constructor() { }

  ngOnInit() {
    
  }

  private getLabelSpecificNotes(specificLabel){
    this.notes.forEach((note)=>{
      note.listOfLabels.forEach((label)=>{
        if(label.labelId==specificLabel.labelId){
          this.labelNotes.push(note);
        }
      })
    })    
    return this.labelNotes;
  }

}
