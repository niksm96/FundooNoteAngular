import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  token = localStorage.getItem('token');
  httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };

  constructor(
    private httpUtil: HttputilService,
    private http: HttpClient
    ) { }

  login(user) {
    return this.httpUtil.postService(environment.base_url + 'login', user);
  }

  register(user) {
    return this.httpUtil.postService(environment.base_url + 'registeruser', user);
  }

  forgotPassword(user) {
    return this.httpUtil.postService(environment.base_url + 'forgotpassword', user);
  }

  resetPassword(user, id) {
    return this.httpUtil.putService(environment.base_url + 'resetpassword/' + id, user, id);
  }

  userDetails(): Observable<any> {
    return this.httpUtil.getService(environment.base_url + 'userdetails', this.httpheaders);
  }

  uploadImage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const request = new HttpRequest('POST', environment.base_url + 'uploadfile/'+this.token, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(request);
  }

  deleteImage(){
    return this.httpUtil.deleteService(environment.base_url + 'deleteImage', this.httpheaders)
  }

  retieveListOfUsers():Observable<any>{
    return this.httpUtil.getServiceWithoutHeader(environment.base_url+'retrieveusers');
  }

  verifyUser(emailId):Observable<any> {
    return this.httpUtil.getServiceWithoutHeader(environment.base_url + 'verifyUser/'+emailId);
  }

  getUserById(userId):Observable<any>{
    return this.httpUtil.getServiceWithoutHeader(environment.base_url+'getUserById/'+userId);
  }

}
