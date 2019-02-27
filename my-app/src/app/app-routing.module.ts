import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomenotebodyComponent } from './homenotebody/homenotebody.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NotecomponentComponent } from './notecomponent/notecomponent.component';
import { UpdatenoteComponent } from './updatenote/updatenote.component';
import { CalenderviewComponent } from './calenderview/calenderview.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'homenotebody', pathMatch: 'full' },
      { path: 'homenotebody', component: HomenotebodyComponent }
    ]
  },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:id', component: ResetpasswordComponent },
  { path: 'calendar', component: CalenderviewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
