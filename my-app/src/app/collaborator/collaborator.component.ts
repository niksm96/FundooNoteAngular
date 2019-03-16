import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserService } from '../core/service/user.service';
import { User } from '../core/models/User';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

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


  constructor(
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.userDetails().subscribe(user => {
      this.user = user;
    })
    this.getImage();
    this.getUsers();
    console.log(this.users);

  }

  public saveCollaboration() {
    this.userService.retieveListOfUsers().subscribe((user) => {
      console.log(user);
      console.log(this.note);
      this.snackBar.open("User email-id verified", "OK", {
        duration: 3000,
      });
    }, (error) => {
      console.log(error);
      this.snackBar.open("User of that email-id doesn't exist", "OK", {
        duration: 3000,
      });
    })
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }

  private getImage() {
    this.userService.userDetails().subscribe((user) => {
      this.user = user;
      if (user.profilePicture != null) {
        const url = `data:${this.user.contentType};base64,${this.user.profilePicture}`;
        this.imageData = {
          imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
        }
      } else {
        this.imageData.imageSrc = null;
      }
    }, (error) => {
      console.log(error);
    }
    );
  }

  private getUsers() {
    this.userService.retieveListOfUsers().subscribe(({ body }) => {
      this.users = body;
    })
  }

}
