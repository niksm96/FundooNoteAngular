import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, MatDialog } from '@angular/material';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { Label } from '../core/models/Label';
import { NoteService } from '../core/service/note.service';
import { forEach } from '@angular/router/src/utils/collection';

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
  styleUrls: ['./sidebar.component.scss'],
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
    private labelService: NoteService
    ) { }

  ngOnInit() {
    this.getLabel();

    this.toggleNav.subscribe(event => {
      if(this.drawer){
        this.drawer.toggle();
      }
    })
  }

  public fetchArchiveNote(){
    // var array = [5,4,8,9,8,4,5,1];
    // var non_duplicate = array.filter((element,position) => {
    //   return array.indexOf(element)==position;
    // });
    // console.log(non_duplicate);
    this.router.navigate(['home/archivenote']);

    // var array2=['Krishna','Vaibhav','Bhushan'];
    // const result =array2.some((item) => item === 'Krishna');
    // console.log(result);
  }
  
  public fetchNote(){
    this.router.navigate(['home/note']);
  }

  public fetchDeletedNote(){
    this.router.navigate(['home/trashnote']);
  }

  public fetchLabelNote(){
    this.router.navigate(['home/labelspecificnote'])
  }

  public openDialog(){
    const dialogRef = this.dialog.open(EditlabelComponent, {
      width: '300px',
      data:''
    });
  }

  public remainder(){
    this.router.navigate(['home/remainder'])
  }

  private getLabel(){
    this.labelService.retrieveLabel().subscribe(label => {
      this.labels = label;
      console.log(this.labels);
      console.log(label)
    })
  }
}
