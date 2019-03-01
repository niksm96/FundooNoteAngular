import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomenotebodyComponent } from './homenotebody/homenotebody.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ArchivenoteComponent } from './archivenote/archivenote.component';
import { TrashnoteComponent } from './trashnote/trashnote.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'homenotebody', pathMatch: 'full' },
      { path: 'homenotebody', component: HomenotebodyComponent },
      { path: 'archivenote', component: ArchivenoteComponent },
      { path: 'trashnote', component: TrashnoteComponent}
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
