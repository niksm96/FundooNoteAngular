import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelToNoteComponent } from './add-label-to-note.component';

describe('AddLabelToNoteComponent', () => {
  let component: AddLabelToNoteComponent;
  let fixture: ComponentFixture<AddLabelToNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabelToNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabelToNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
