import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeepHelperService } from '../core/service/keep-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter();

  constructor(
    private helper: KeepHelperService,
    private router: Router
    ) { }

  public enable = false;

  public searchInput = '';

  ngOnInit() {
  }

  public toggleOnClick() {
    this.toggle.emit();
  }

  public changeGrid() {
    this.enable = !this.enable;
    this.helper.setTheme(this.enable);
  }

  public search(){
    this.helper.setSearch(this.searchInput);
    this.router.navigate(['home/search'])
  }

  closeSearch(){
    this.router.navigate(['home/note']);
  }

}
