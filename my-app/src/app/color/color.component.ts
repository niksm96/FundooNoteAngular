import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  @Input() particularNote

  @Output() colorEvent = new EventEmitter();

  public colors = ['#EE82EE','#FF6347','#2E8B57',	'#4169E1','#EEE8AA','#FF7F50','#FFA500','	#FFFFFF']

  constructor() { }

  ngOnInit() {
  }

  changeColor(color){
    this.particularNote.color = color;
    const note = this.particularNote;
    const data = {note};
    this.colorEvent.emit(data);

  }

}
