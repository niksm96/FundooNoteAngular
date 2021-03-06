import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttputilService {

  constructor(private http : HttpClient) {}

  postService(url,object){
    return this.http.post<any>(url,object,{observe : 'response'});
  }

  putService(url,object,header){
    return this.http.put<any>(url,object,header);
  }

  getService(url,header){
    return this.http.get<any>(url,header);
  }

  deleteService(url,header){
    return this.http.delete<any>(url,header);
  }

  postServiceWithHeader(url,object,header){
    return this.http.post<any>(url,object,header);
  }

  putServiceOnlyHeader(url,header){
    return this.http.put<any>(url,header,{observe : 'response'});
  }

  getServiceWithoutHeader(url){
    return this.http.get<any>(url,{observe : 'response'});
  }

  postServiceWithUrl(url){
    return this.http.post<any>(url,{observe : 'response'});
  }


  deleteServiceWithUrl(url){
    return this.http.delete<any>(url);
  }
}
