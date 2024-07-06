import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  public register() {
    if (this.loginForm.valid) {
      console.log('Login form is valid');
      console.log('Email:', this.loginForm.value.email);
      console.log('Password:', this.loginForm.value.password);
    } else {
      console.log('Login form is invalid');
    }
  }

  public redirectToLogin() {
    this.router.navigate(['/login'])

  }
}
