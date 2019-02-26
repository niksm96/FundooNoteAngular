import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatRippleModule, MatSelectModule,
  MatInputModule, MatCardModule, MatMenuModule, MatToolbarModule, MatSidenavModule, 
  MatDividerModule, MatListModule, MatExpansionModule, MatSnackBarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon'; 
import { HttpClientModule } from '@angular/common/http';
// import { FlatpickrModule } from 'angular-flatpickr';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule
  ]
})
export class AppMaterialModule { }
