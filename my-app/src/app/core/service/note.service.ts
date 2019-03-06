import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  token = localStorage.getItem('token');
  httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };


  constructor(
    private httpUtil: HttputilService
  ) { }

  retrieveNote(): Observable<any> {
    return this.httpUtil.getService(environment.note_url + 'retrievenote', this.httpheaders);
  }

  createNote(note): Observable<any> {
    return this.httpUtil.postServiceWithHeader(environment.note_url + 'createnote', note, this.httpheaders);
  }

  deleteNote(noteId): Observable<any> {
    return this.httpUtil.deleteService(environment.note_url + 'deletenote/' + noteId, this.httpheaders);
  }

  updateNote(note): Observable<any> {
    return this.httpUtil.putService(environment.note_url + 'updatenote/' + note.noteId, note, this.httpheaders);
  }

  retrieveLabel(): Observable<any> {
    return this.httpUtil.getService(environment.note_url + 'retrievelabel', this.httpheaders);
  }

  createLabel(label): Observable<any> {
    return this.httpUtil.postServiceWithHeader(environment.note_url + 'createlabel', label, this.httpheaders);
  }

  deleteLabel(labelId): Observable<any> {
    return this.httpUtil.deleteService(environment.note_url + 'deletelabel/' + labelId, this.httpheaders);
  }

  updateLabel(label): Observable<any> {
    return this.httpUtil.putService(environment.note_url + 'updatelabel/' + label.labelId, label, this.httpheaders);
  }

  deleteLabelFromNote(noteId, labelId) {
    return this.httpUtil.deleteService(environment.note_url + 'removelabelfromnote', {
      params: {
        noteId: noteId,
        labelId: labelId
      }, observe: 'response'
    });
  }

}
