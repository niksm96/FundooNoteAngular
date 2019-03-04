import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer')  public drawer;

  date = new FormControl;

  @Input() public toggleNav : Subject<any>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.toggleNav.subscribe(event => {
      if(this.drawer){
        this.drawer.toggle();
      }
    })
  }

  fetchArchiveNote(){
    this.router.navigate(['home/archivenote']);
  }
  fetchNote(){
    this.router.navigate(['home/note']);
  }

  fetchDeletedNote(){
    this.router.navigate(['home/trashnote']);
  }

  

}
