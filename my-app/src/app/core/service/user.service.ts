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
    return this.httpUtil.postService(environment.base_url + 'login', user);
  }

  register(user) {
    return this.httpUtil.postService(environment.base_url + 'registeruser', user);
  }

  forgotPassword(user){
    return this.httpUtil.postService(environment.base_url+'forgotpassword',user);
  }

  resetPassword(user,id){
    return this.httpUtil.putService(environment.base_url+'resetpassword/'+id,user,id);
  }
}
