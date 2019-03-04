import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public toggleOnClick(){
    this.toggle.emit();
  }

}
