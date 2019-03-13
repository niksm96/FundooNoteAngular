import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../core/service/user.service';
import { User } from '../core/models/User';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  user: User;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.userService.userDetails().subscribe(user=>{
      this.user = user;
    })
  }

  public saveCollaboration(collaboratedUser){
    console.log(collaboratedUser);
    this.dialogRef.close();
  }

}
