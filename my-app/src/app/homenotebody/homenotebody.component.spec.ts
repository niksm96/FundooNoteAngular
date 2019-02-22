import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenotebodyComponent } from './homenotebody.component';

describe('HomenotebodyComponent', () => {
  let component: HomenotebodyComponent;
  let fixture: ComponentFixture<HomenotebodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenotebodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenotebodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
