import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashdialogComponent } from './trashdialog.component';

describe('TrashdialogComponent', () => {
  let component: TrashdialogComponent;
  let fixture: ComponentFixture<TrashdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
