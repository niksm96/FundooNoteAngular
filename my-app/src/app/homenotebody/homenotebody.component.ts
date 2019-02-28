import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homenotebody',
  templateUrl: './homenotebody.component.html',
  styleUrls: ['./homenotebody.component.css']
})
export class HomenotebodyComponent implements OnInit {

  createNoteForm: FormGroup
  

  constructor(private noteService: NoteService,
    private snackBar: MatSnackBar, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {
    this.createNoteForm = this.formBuilder.group({
      title: [''],
      description: ['', Validators.required]
    });
   
  }

  onSubmit(note) {
    if (this.createNoteForm.invalid) {
      this.snackBar.open("Empty note cannot be created", "OK", {
        duration: 3000,
      });
      return;
    }
    this.noteService.createNote(note).subscribe(response => {
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
