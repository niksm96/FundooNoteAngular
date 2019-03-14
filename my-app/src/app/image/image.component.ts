import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserService } from '../core/service/user.service';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers: [UserService]
})
export class ImageComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(public dialogRef: MatDialogRef<ImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadImage() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.uploadImage(this.currentFileUpload).subscribe(event => {
      this.snackBar.open("Image Successfully Uploaded", "OK", {
        duration: 3000,
      });
      this.dialogRef.close();
    },
    (error)=>{
      this.snackBar.open("Image Failed To Uploaded", "OK", {
        duration: 3000,
      });
      console.log(error)
    });
    this.selectedFiles = undefined;
  }

  cancel(){
    this.dialogRef.close();
  }

  deleteImage(){
    this.userService.deleteImage().subscribe(event => {
      this.snackBar.open("Image Successfully Deleted", "OK", {
        duration: 3000,
      });
      this.dialogRef.close();
    },
    (error)=>{
      this.snackBar.open("Image Failed To Delete", "OK", {
        duration: 3000,
      });
      console.log(error)
    });
  }

}
