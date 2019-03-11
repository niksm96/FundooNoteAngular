import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeepHelperService {
  public theme$: Subject<any> = new Subject();

  public searchBar$ : Subject<any> = new Subject();
  
  constructor() { }

  public setTheme(themeChanged: boolean) {
    this.theme$.next(themeChanged);
  }

  public getTheme() {
    return this.theme$;
  }

  public setSearchBar(searchMain: string){
    this.searchBar$.next(searchMain);
  }

  public getSearchBar(){
    return this.searchBar$;
  }
}
