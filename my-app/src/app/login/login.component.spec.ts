import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { By } from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService;
  let loginSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call auth login method',async(()=>{
  //   let loginElement: DebugElement;
  //   const debugElement = fixture.debugElement;
  //   authService = debugElement.injector.get(AuthGuard);
  //   loginSpy = spyOn(authService , 'loginByUsernameAndPassword').and.callThrough();
  //   loginElement = fixture.debugElement.query(By.css('form'));
  //   // to set values
  //   component.loginForm.controls['emailId'];
  //   component.loginForm.controls['password'];
  //   loginElement.triggerEventHandler('ngSubmit', null);
  //   expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
  // }))
});
