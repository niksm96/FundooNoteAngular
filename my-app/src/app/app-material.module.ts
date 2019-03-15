import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatRippleModule, MatSelectModule,
  MatInputModule, MatCardModule, MatMenuModule, MatToolbarModule, MatSidenavModule,
  MatDividerModule, MatListModule, MatExpansionModule, MatSnackBarModule, 
  MatDatepickerModule, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS, NativeDateModule, 
  MatDialogModule,MatChipsModule, MatCheckboxModule, MatAutocompleteModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
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
    MatSnackBarModule,
    MatDatepickerModule,
    NativeDateModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule
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
    MatSnackBarModule,
    MatDatepickerModule,
    NativeDateModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
   providers: [
    {provide: MAT_DATE_FORMATS, useValue:MAT_NATIVE_DATE_FORMATS},
  ]
})
export class AppMaterialModule { }
