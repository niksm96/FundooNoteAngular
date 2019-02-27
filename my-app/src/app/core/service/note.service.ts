import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  token = localStorage.getItem('token');
  httpheaders = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };
 

  constructor(private httpUtil: HttputilService,
    private route: ActivatedRoute) { }

  retrieveNote():Observable<any> {
    return this.httpUtil.getService(environment.note_url+'retrievenote',this.httpheaders);
  }

  createNote(note):Observable<any>{
    return this.httpUtil.postServiceWithHeader(environment.note_url+'createnote',note,this.httpheaders);
  }

  deleteNote(note):Observable<any>{
    return this.httpUtil.postServiceWithHeader(environment.note_url+'deletenote',note,this.httpheaders);
  }

  updateNote(note):Observable<any>{
    return this.httpUtil.putService(environment.note_url+'updatenote',note,this.httpheaders);
  }
}
