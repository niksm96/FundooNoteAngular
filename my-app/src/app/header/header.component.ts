import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeepHelperService } from '../core/service/keep-helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter();

  constructor(private helper: KeepHelperService) { }

  public enable = false;

  ngOnInit() {
  }

  public toggleOnClick() {
    this.toggle.emit();
  }

  public changeGrid() {
    this.enable = !this.enable;
    this.helper.setTheme(this.enable);
  }

}
