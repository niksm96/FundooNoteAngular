import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelspecificnoteComponent } from './labelspecificnote.component';

describe('LabelspecificnoteComponent', () => {
  let component: LabelspecificnoteComponent;
  let fixture: ComponentFixture<LabelspecificnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelspecificnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelspecificnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
