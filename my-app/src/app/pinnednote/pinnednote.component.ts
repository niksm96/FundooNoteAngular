import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../core/models/Note';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperServiceService } from '../core/service/helper-service.service';

@Component({
  selector: 'app-pinnednote',
  templateUrl: './pinnednote.component.html',
  styleUrls: ['./pinnednote.component.css']
})
export class PinnednoteComponent implements OnInit {

  @Input() notes
  @Output() pinnedEvent = new EventEmitter();

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private helperService: HelperServiceService
  ) { }

  ngOnInit() {

  }

  openDialog(note) {
    this.helperService.openDialogService(note);
  }

  moveToTrash(note) {
    var newNote = this.helperService.moveToTrashService(note);
    this.updateCall(newNote);
    this.snackBar.open("Note moved to trash", "OK", {
      duration: 3000,
    });

  }

  updateCall(newNote) {
    this.noteService.updateNote(newNote).subscribe(response => {
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Sorry, something went wrong", "OK", {
          duration: 3000,
        });
      })
  }
  updateArchiveNote(note) {
    var newNote = this.helperService.updateArchiveNoteService(note)
    this.updateCall(newNote);
    this.snackBar.open("Note archived", "OK", {
      duration: 3000,
    });

  }

  unPinNote(note) {
    var newNote = this.helperService.unPinService(note);
    this.updateCall(newNote);
    this.snackBar.open("Note un-pinned", "OK", {
      duration: 3000,
    });
  }

  removeLabel(labelId, noteId) {
    this.noteService.deleteLabelFromNote(noteId, labelId).subscribe(response => {
      this.snackBar.open("Label removed successfully from note", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Label couldn't be removed", "OK", {
          duration: 3000,
        });
      })
  }
}
