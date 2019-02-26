import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,20}$")]],
      emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,8}$")]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("Invalid Entry")
      this.snackBar.open("Fields not in required format", "OK", {
        duration: 3000,
      });
      return;
    }
    console.log(user);
    this.userService.register(user).subscribe(response => {
      console.log("Successfully register");
      this.snackBar.open("Registered Successfully", "OK", {
        duration: 3000,
      });
      this.router.navigate(['login']);
    }, (error) => {
      console.log("Couldn't register")
      this.snackBar.open("Something went wrong", "OK", {
        duration: 3000,
      });
    });
  }

}
