import { Component, OnInit } from '@angular/core';
import { Label } from '../core/models/Label';
import { Note } from '../core/models/Note';
import { notEqual } from 'assert';
import { NoteService } from '../core/service/note.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { KeepHelperService } from '../core/service/keep-helper.service';

@Component({
  selector: 'app-labelspecificnote',
  templateUrl: './labelspecificnote.component.html',
  styleUrls: ['./labelspecificnote.component.scss']
})
export class LabelspecificnoteComponent implements OnInit {

  labels: Label[] = [];

  notes: Note[] = [];

  labelNotes: Note[] = [];

  labelName: string;

  public grid = false;

  constructor(
    private router: ActivatedRoute,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private helper: KeepHelperService
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.labelName = params['labelName'];
      this.helper.getTheme().subscribe((response) => {
        this.grid = response;
      })
      this.getNotes();
    })

  }


  public refresh(event) {
    this.updateNote(event.note);
  }

  private getLabelSpecificNotes(notes) {
    this.labelNotes.length = 0;
    notes.filter((note) => {
      note.listOfLabels.filter((label) => {
        if (this.labelName == label.labelName && !note.trashed) {
          this.labelNotes.push(note);
        }
      })
    })
    return this.labelNotes;
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
      this.getLabelSpecificNotes(this.notes)
    });
  }

}
