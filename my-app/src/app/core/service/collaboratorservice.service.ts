import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorserviceService {

  constructor(private httpUtil:HttputilService) { }

  addCollaborator(noteId,userId):Observable<any>{
    return this.httpUtil.postServiceWithUrl(environment.collaborator_url+'addcollaborator/'+noteId+'/'+userId);
  }

  removeCollaborator(noteId,userId){
    return this.httpUtil.deleteServiceWithUrl(environment.collaborator_url+'removecollaborator/'+noteId+'/'+userId);
  }
}

  