import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ArchivenoteComponent } from './archivenote/archivenote.component';
import { TrashnoteComponent } from './trashnote/trashnote.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { LabelspecificnoteComponent } from './labelspecificnote/labelspecificnote.component';
import { SearchComponent } from './search/search.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './auth.guard';
import { RemainderComponent } from './remainder/remainder.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'note', pathMatch: 'full' },
      { path: 'note', component: ViewNotesComponent },
      { path: 'archivenote', component: ArchivenoteComponent },
      { path: 'trashnote', component: TrashnoteComponent },
      { path: 'labelspecificnote/:labelName', component: LabelspecificnoteComponent },
      { path: 'search', component: SearchComponent },
      { path: 'remainder', component: RemainderComponent }
    ]
  },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:id', component: ResetpasswordComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
