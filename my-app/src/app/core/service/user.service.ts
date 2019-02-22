import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpUtil: HttputilService,
    private router: Router, ) { }

  login(user) {
    this.httpUtil.postService(environment.base_url + 'login', user).subscribe(response => {
      if (response.status == 200) {
        console.log("You have logged in successfully");
        localStorage.setItem("token",response.headers.get('token'));
        this.router.navigate(['home']);
      }
      else {
        console.log("Failed to logged in");
      }
    });
  }

  register(user) {
    this.httpUtil.postService(environment.base_url + 'registeruser', user).subscribe(response => {
      if (response.status == 200) {
        console.log("Successfully register");
      }
      else {
        console.log("Registration failed due to some reasons");
      }
    })
  }
}
