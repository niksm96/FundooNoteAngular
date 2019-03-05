import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttputilService } from './httputil.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  token = localStorage.getItem('token');
  httpheaders = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };

  constructor( private httpUtil: HttputilService) { }

  retrieveLabel():Observable<any> {
    return this.httpUtil.getService(environment.note_url+'retrievelabel',this.httpheaders);
  }

  createLabel(label):Observable<any>{
    return this.httpUtil.postServiceWithHeader(environment.note_url+'createlabel',label,this.httpheaders);
  }

  deleteLabel(labelId):Observable<any>{
    return this.httpUtil.deleteService(environment.note_url+'deletelabel/'+labelId,this.httpheaders);
  }

  updateLabel(label):Observable<any>{
    return this.httpUtil.putService(environment.note_url+'updatelabel/'+label.labelId,label,this.httpheaders);
  }

}
