import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/service/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.snackBar.open("Both fields are required", "OK", {
        duration: 3000,
      });
      return;
    }
    console.log(user);
    this.userService.login(user).subscribe(response => {
      console.log("You have logged in successfully");
      localStorage.setItem('token',response.headers.get('token'));
      this.snackBar.open("Successfully logged in", "OK", {
        duration: 3000,
      });
      console.log('header', response.headers.get('token'));
      this.router.navigate(['home']);

    }, (error) => {
      console.log("Couldn't log in ");
      this.snackBar.open("Email-Id or Password is invalid", "OK", {
        duration: 3000,
      });
    });
  }
}
