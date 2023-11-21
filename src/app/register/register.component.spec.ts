import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { WebAuthnService } from '../web-authn.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {

    const webAuthnService = jasmine.createSpyObj('WebAuthnService', ['registerUser']);

    await TestBed.configureTestingModule({
      providers: [{ provide: WebAuthnService, useValue: webAuthnService }],
      imports: [RegisterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
