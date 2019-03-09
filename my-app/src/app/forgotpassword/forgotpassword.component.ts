import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public submitted = false;
  public hide = true;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: ['', Validators.required],
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  public onSubmit(emailId) {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }
    console.log(emailId);
    this.userService.forgotPassword(emailId).subscribe(response => {
      console.log("Reset password intiated");
      this.snackBar.open("Email to reset your password has been sent your email-id","OK",{
        duration:3000,
      });

    }, (error) => {
      console.log("Couldn't log in ");
      this.snackBar.open("Email couldn't be sent","OK",{
        duration:3000,
      });
    });
  }
}
