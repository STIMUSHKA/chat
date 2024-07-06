import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'chat';

  constructor(
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.AuthService.getCurrentUser().subscribe()
  }
  
}
