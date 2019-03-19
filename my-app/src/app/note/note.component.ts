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


  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createNoteForm = this.formBuilder.group({
      title: [''],
      description: ['', Validators.required]
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
      this.createNoteEvent.emit();
      this.snackBar.open("Note created successfully", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        this.snackBar.open("Note creation failed", "OK", {
          duration: 3000,
        });
      });
  }

}
