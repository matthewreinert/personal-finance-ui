import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginFinishResponse } from '../login';
import { WebAuthnService } from '../web-authn.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [NgIf, ReactiveFormsModule],
})
export class LoginComponent {
  error = '';
  submitted = false;

  constructor(
    private webAuthnService: WebAuthnService,
    private formBuilder: NonNullableFormBuilder
  ) { }

  loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email])
  });

  onSubmit() {
    this.error = '';
    this.submitted = true;

    if (this.loginForm.valid) {
      this.webAuthnService.loginUser(this.loginForm.value).subscribe({
        next: (response: LoginFinishResponse) => {
          if (response.success) {
            console.log("Login complete!!");
          }
        },
        error: (e) => this.error = e
      });
    } else {
      this.error = 'Please correct any errors above.'
    }
  }

  get email() {
    return this.loginForm.get('email')!;
  }

}
