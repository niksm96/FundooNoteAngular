import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from './app-material.module';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UpdatenoteComponent } from './updatenote/updatenote.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchivenoteComponent } from './archivenote/archivenote.component';
import { TrashnoteComponent } from './trashnote/trashnote.component';
import { TrashdialogComponent } from './trashdialog/trashdialog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NoteComponent } from './note/note.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { EditlabelComponent } from './editlabel/editlabel.component';
import { LabelspecificnoteComponent } from './labelspecificnote/labelspecificnote.component';
import { FetchnoteComponent } from './fetchnote/fetchnote.component';
import { NotefilterPipe } from './notefilter.pipe';
import { SearchnotePipe } from './searchnote.pipe';
import { AddLabelToNoteComponent } from './add-label-to-note/add-label-to-note.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { SearchComponent } from './search/search.component';
import { ImageComponent } from './image/image.component';
import { SearchuserPipe } from './searchuser.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    UpdatenoteComponent,
    ArchivenoteComponent,
    TrashnoteComponent,
    TrashdialogComponent,
    SidebarComponent,
    HeaderComponent,
    NoteComponent,
    ViewNotesComponent,
    EditlabelComponent,
    LabelspecificnoteComponent,
    FetchnoteComponent,
    NotefilterPipe,
    SearchnotePipe,
    AddLabelToNoteComponent,
    SearchfilterPipe,
    CollaboratorComponent,
    SearchComponent,
    ImageComponent,
    SearchuserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents: [
    UpdatenoteComponent , 
    TrashdialogComponent,
    EditlabelComponent,
    CollaboratorComponent,
    ImageComponent   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
