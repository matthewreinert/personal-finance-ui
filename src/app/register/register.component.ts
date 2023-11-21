import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationFinishResponse } from '../registration';
import { WebAuthnService } from '../web-authn.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [NgIf, ReactiveFormsModule],
})

export class RegisterComponent {
  error: string = '';
  submitted: boolean = false;


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private webAuthnService: WebAuthnService,
  ) { }

  registerForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    name: this.formBuilder.control('', Validators.required)
  });

  onSubmit() {
    this.error = '';
    this.submitted = true;

    if (this.registerForm.valid) {
      this.webAuthnService.registerUser(this.registerForm.value).subscribe({
        next: (response: RegistrationFinishResponse) => {
          if (response.registrationComplete) {
            console.log("Registration complete!!");
            this.router.navigate(['/login'])
          }
        },
        error: (e) => this.error = e
      });
    } else {
      this.error = 'Please correct any errors above.'
    }

  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get name() {
    return this.registerForm.get('name')!;
  }
}
