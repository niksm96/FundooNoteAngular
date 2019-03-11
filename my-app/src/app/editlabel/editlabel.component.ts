import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Label } from '../core/models/Label';
import { FormGroup } from '@angular/forms';
import { NoteService } from '../core/service/note.service';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  public labels: Label[] = [];

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data, 
    private labelService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
   this.retrieveLabel();
  }

  
  public closeClick(){
    this.dialogRef.close();
  }

  public updateLabel(label,labelName){
    var name= labelName.innerHTML;
    var newLabel = 
    {
      ...label,
      "labelName":name
    }
    this.labelService.updateLabel(newLabel).subscribe(response => {
      this.ngOnInit();

      this.snackBar.open("Label Updated Successfully", "OK", {
        duration: 3000,
      });
    },
    (error)=>{
      console.log(error);
      this.snackBar.open("Label Updation Failed", "OK", {
        duration: 3000,
      });
    })
  }

  public deleteLabel(labelId){
    this.labelService.deleteLabel(labelId).subscribe(response => {
      this.ngOnInit();
      this.snackBar.open("Label Deleted Successfully", "OK", {
        duration: 3000,
      });
    },
    (error)=>{
      console.log(error);
      this.snackBar.open("Label Deletion Failed", "OK", {
        duration: 3000,
      });
    })
  }

  public createLabel(label){
    var name = label.innerHTML;
    if(name == ''){
      this.snackBar.open("Empty label cannot be created", "OK", {
        duration: 3000,
      });
      return;
    }
    var newLabel = 
    {
      "labelName":name
    }
    this.labelService.createLabel(newLabel).subscribe(response => {
      this.ngOnInit();

      this.snackBar.open("Label Created Successfully", "OK", {
        duration: 3000,
      });
    },
    (error)=>{
      console.log(error);
      this.snackBar.open("Label Creation Failed", "OK", {
        duration: 3000,
      });
    })
  }

  private retrieveLabel(){
    this.labelService.retrieveLabel().subscribe(label => {
      this.labels = label;
    })
  }

}
