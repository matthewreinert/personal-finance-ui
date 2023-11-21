import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { WebAuthnService } from '../web-authn.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {

    const webAuthnService = jasmine.createSpyObj('WebAuthnService', ['loginUser']);

    await TestBed.configureTestingModule({
      providers: [{ provide: WebAuthnService, useValue: webAuthnService }],
      imports: [LoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
