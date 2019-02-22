import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpUtil: HttputilService) { }

  retrieveNote(){
    this.httpUtil.getService(environment.note_url,localStorage.getItem('token'));
  }
}
