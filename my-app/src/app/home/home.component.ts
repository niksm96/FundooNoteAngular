import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import { FormControl } from '@angular/forms';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class HomeComponent implements OnInit {

  date = new FormControl;
  
  constructor(private router:Router ) { }

  ngOnInit() {
  }

  fetchArchiveNote(){
    this.router.navigate(['home/archivenote']);
  }
  fetchNote(){
    this.router.navigate(['home/homenotebody']);
  }
}
