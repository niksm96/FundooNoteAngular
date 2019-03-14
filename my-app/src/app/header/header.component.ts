import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeepHelperService } from '../core/service/keep-helper.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ImageComponent } from '../image/image.component';
import { UserService } from '../core/service/user.service';
import { DomSanitizer } from '@angular/platform-browser';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter();

  public user: any;

  public enable = false;

  public searchInput = '';

  public imageData = <ImageData>{};

  constructor(
    private helper: KeepHelperService,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit() {
    this.getImage();

  }

  public toggleOnClick() {
    this.toggle.emit();
  }

  public changeGrid() {
    this.enable = !this.enable;
    this.helper.setTheme(this.enable);
  }

  public search() {
    this.helper.setSearch(this.searchInput);
    this.router.navigate(['home/search'])
  }

  public closeSearch() {
    this.router.navigate(['home/note']);
  }

  public openDialogImage() {
    const dialogRef = this.dialog.open(ImageComponent, {
      width: '300px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getImage();
      console.log("Dialog closed")
    })
  }

  private getImage() {
    this.userService.userDetails().subscribe((user) => {
      this.user = user;
      if (user.profilePicture != null) {
        const url = `data:${this.user.contentType};base64,${this.user.profilePicture}`;
        this.imageData = {
          imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
        }
      }else{
        this.imageData.imageSrc = null;
      }
    }, (error) => {
      console.log(error)
    }
    );
  }
}
