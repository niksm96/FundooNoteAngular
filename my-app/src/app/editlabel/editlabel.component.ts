import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LabelService } from '../core/service/label.service';
import { Label } from '../core/models/Label';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.css']
})
export class EditlabelComponent implements OnInit {

  labels: Label[] = [];

  createLabelForm = FormGroup

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data, 
    private labelService: LabelService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.labelService.retrieveLabel().subscribe(label => {
      this.labels = label;
      console.log(this.labels);
      console.log(label)
    })
  }

  closeClick(){
    this.dialogRef.close();
  }

  updateLabel(label,labelName){
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

  deleteLabel(labelId){
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

  createLabel(label){
    var name= label.innerHTML;
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
}
