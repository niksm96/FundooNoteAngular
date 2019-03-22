import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Output() createNoteEvent = new EventEmitter();

  public createNoteForm: FormGroup

  min=new Date();

  selectedReminder =new Date();



  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createNoteForm = this.formBuilder.group({
      title: [''],
      description: ['', Validators.required],
      reminder:['']
    });

  }

  public onSubmit(note) {
    if (this.createNoteForm.invalid) {
      this.snackBar.open("Empty note cannot be created", "OK", {
        duration: 3000,
      });
      return;
    }
    this.noteService.createNote(note).subscribe(response => {
      this.createNoteEvent.emit(true);
      this.snackBar.open("Note created successfully", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Note creation failed", "OK", {
          duration: 3000,
        });
      });
  }

  public updateArchiveNote(note) {
    note.pinned = 0;
    note.archive = 1;
    this.onSubmit(note);
    this.snackBar.open("Note archived", "OK", {
      duration: 3000,
    });
  }

  public updateColor(data){
    this.onSubmit(data.note);
  }

  pinnedNote(note){
    note.pinned = 1;
    this.onSubmit(note);
    this.snackBar.open("Note pinned", "OK", {
      duration: 3000,
    });
  }

  updateReminder(reminder,note){
    note.reminder=reminder;
    this.onSubmit(note);
    this.snackBar.open("Note Reminder Set", "OK", {
      duration: 3000,
    });
  }

}
