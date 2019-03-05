import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, MatDialog } from '@angular/material';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { Label } from '../core/models/Label';
import { LabelService } from '../core/service/label.service';

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

  public labels : Label[] = [];

  constructor(
    private router: Router,
    private dialog : MatDialog,
    private labelService : LabelService
    ) { }

  ngOnInit() {
    this.getLabel();

    this.toggleNav.subscribe(event => {
      if(this.drawer){
        this.drawer.toggle();
      }
    })
  }

  getLabel(){
    this.labelService.retrieveLabel().subscribe(label => {
      this.labels = label;
      console.log(this.labels);
      console.log(label)
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

  fetchLabelNote(){
    this.router.navigate(['home/labelspecificnote'])
  }

  openDialog(){
    const dialogRef = this.dialog.open(EditlabelComponent, {
      width: '300px',
      data:''
    });
  }

}
