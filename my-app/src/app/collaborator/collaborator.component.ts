import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserService } from '../core/service/user.service';
import { User } from '../core/models/User';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { CollaboratorserviceService } from '../core/service/collaboratorservice.service';
import { Note } from '../core/models/Note';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss'],
})
export class CollaboratorComponent implements OnInit {

  user: any;

  users: User[] = [];

  public imageData = <ImageData>{};

  public myControl = new FormControl();

  public collaboratedUsers : User[] = [];


  constructor(
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private collaboratorService:CollaboratorserviceService
  ) { }

  // ngOnChanges(){
  //   this.getListOfCollaboratedUsers();
  // }

  ngOnInit() {
    this.userService.userDetails().subscribe(user => {
      this.user = user;
    })
    // this.getImage();
    this.noteOwner();
    this.getUsers();
    this.getListOfCollaboratedUsers();

  }

  public saveCollaboration(emailId) {
    this.userService.verifyUser(emailId).subscribe(({body}) => {
      const user=body;
      if(user.id===this.note.userId)
      {
        this.snackBar.open("You cannont add owner", "error")
        return;
      }
      console.log(user.id);
      console.log(this.note);
      this.collaboratorService.addCollaborator(this.note.noteId,user.id).subscribe((response)=>{
        this.snackBar.open("Collaboration Successfully Added", "OK", {
          duration: 3000,
        });
      })
    }, (error) => {
      console.log(error);
      this.snackBar.open("Collaboration Failed", "OK", {
        duration: 3000,
      });
    })
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }

  private noteOwner(){
    this.userService.getUserById( this.note.userId).subscribe(({body})=>{
      this.user = body;
    });
  }

  // private getImage() {
  //   this.userService.userDetails().subscribe((user) => {
  //     this.user = user;
  //     if (user.profilePicture != null) {
  //       const url = `data:${this.user.contentType};base64,${this.user.profilePicture}`;
  //       this.imageData = {
  //         imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
  //       }
  //     } else {
  //       this.imageData.imageSrc = null;
  //     }
  //   }, (error) => {
  //     console.log(error);
  //   }
  //   );
  // }

  private getUsers() {
    this.userService.retieveListOfUsers().subscribe(({ body }) => {
      this.users = body;
    })
  }

  private getListOfCollaboratedUsers(){
    console.log(this.note.collaborators)
    for(let i=0; i < this.note.collaborators.length;i++){
      var k = 0;
      this.userService.getUserById( this.note.collaborators[i].userId).subscribe(({body})=>{
        this.collaboratedUsers[k] = body;
        k++;
      },
      (error)=>{
        console.log(error);
      });
    }
  }

  public removeCollaborator(collabedUser){
    this.collaboratorService.removeCollaborator(this.note.noteId,collabedUser.id).subscribe((response)=>{
      this.dialogRef.close();
      this.snackBar.open("Collaboration Removed Successfully", "OK", {
        duration: 3000,
      });
    });
  }
  

}
