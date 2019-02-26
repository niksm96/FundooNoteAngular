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

  constructor(private httpUtil: HttputilService,
    private route: ActivatedRoute) { }

  retrieveNote():Observable<any> {
    var token= localStorage.getItem('token');
    var httpheaders = {
      headers:new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.httpUtil.getService(environment.note_url+'retrievenote',httpheaders);
  }
}
