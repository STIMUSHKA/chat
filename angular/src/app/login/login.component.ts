import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Используйте styleUrls для стилей
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Login form is valid');
      console.log('Email:', this.loginForm.value.email);
      console.log('Password:', this.loginForm.value.password);
      // Здесь вы можете добавить логику для обработки входа пользователя
    } else {
      console.log('Login form is invalid');
      // Здесь можно добавить обработку невалидной формы
    }
  }
}
