import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchnoteComponent } from './fetchnote.component';

describe('FetchnoteComponent', () => {
  let component: FetchnoteComponent;
  let fixture: ComponentFixture<FetchnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
