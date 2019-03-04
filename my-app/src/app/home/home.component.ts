import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit {

 

  public toggleNav: Subject<any> = new Subject();

  constructor(private router:Router ) { }

  ngOnInit() {
  }

  public toggleOnClick() {
    this.toggleNav.next();
  }
}
