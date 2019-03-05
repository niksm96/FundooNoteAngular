import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnednoteComponent } from './pinnednote.component';

describe('PinnednoteComponent', () => {
  let component: PinnednoteComponent;
  let fixture: ComponentFixture<PinnednoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnednoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnednoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
