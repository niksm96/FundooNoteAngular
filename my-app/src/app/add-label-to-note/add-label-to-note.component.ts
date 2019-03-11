import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Label } from '../core/models/Label';
import { NoteService } from '../core/service/note.service';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-label-to-note',
  templateUrl: './add-label-to-note.component.html',
  styleUrls: ['./add-label-to-note.component.scss']
})
export class AddLabelToNoteComponent implements OnInit {

  @Input() note;

  @Output() addLabelToNoteEvent = new EventEmitter();

  labels: Label[] = [];

  public filter = '';

  public newLabels: Label[] = [];

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.retrieveLabel();
  }

  public labelFilter(event, noteLabels) {
    event.stopPropagation();
    this.newLabels.length = 0;
    var k = 0;
    for (var i = 0; i < this.labels.length; i++) {
      var present = 0;
      for (var j = 0; j < noteLabels.length; j++) {
        if (this.labels[i].labelId === noteLabels[j].labelId && present === 0) {
          present = 1;
        }
      }
      if (present === 0) {
        this.newLabels[k] = this.labels[i];
        k++;
      }
    }
  }

  public onCheck(event, note, label) {
    event.stopPropagation();
    this.noteService.addLabelToNote(note.noteId, label).subscribe(response => {
      this.snackBar.open("Label added to note successfully", "OK", {
        duration: 3000,
      });
    })
    const data = { note };
    this.addLabelToNoteEvent.emit(data);
  }

  private retrieveLabel() {
    this.noteService.retrieveLabel().subscribe(label => {
      this.labels = label;
    })
  }

  public createLabel(event, filter, note) {
    event.stopPropagation();
    if (note.listOfLabels.some((label) => label.labelName == filter) || this.newLabels.some((label) => label.labelName == filter)) {
      this.snackBar.open("Label name already exists", "OK", {
        duration: 3000,
      });
      return;
    }
    this.createLabelMethod(filter,note);
  }

  private createLabelMethod(label, note) {
    if (label == '') {
      this.snackBar.open("Empty label cannot be created", "OK", {
        duration: 3000,
      });
      return;
    }
    var newLabel =
    {
      "labelName": label
    }
    this.noteService.createLabel(newLabel).subscribe(returnedLabel => {
      this.noteService.addLabelToNote(note.noteId, returnedLabel).subscribe(response => {
        const data = { note };
        this.addLabelToNoteEvent.emit(data);
        this.snackBar.open("Label added to note successfully", "OK", {
          duration: 3000,
        });
      })
    },
      (error) => {
        console.log(error);
        this.snackBar.open("Label Creation Failed", "OK", {
          duration: 3000,
        });
      })
  }

}
