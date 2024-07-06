import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  public register() {
    if (this.loginForm.valid) {
      const cridentals = {
        username: this.loginForm.value.username,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.AuthService.register(cridentals.username, cridentals.email, cridentals.password).subscribe( user => {
        console.log(user);
        this.router.navigate(['/profile']);
      })
    } else {
      console.log('Login form is invalid');
    }
  }

  public redirectToLogin() {
    this.router.navigate(['/login'])

  }
}
