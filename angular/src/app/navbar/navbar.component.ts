import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public userName = ''
  constructor(
    private router: Router,
    private AuthService: AuthService
  ) { }


  ngOnInit(): void {
    this.AuthService.currentUser.subscribe( user => {
      this.userName = user?.username
    })
  }

  public redirectLogin() {
    this.router.navigate(['/login'])
  }

  public redirectToProfile() {
    this.router.navigate(['/profile'])
  }
  
  public redirectHome() {
    this.router.navigate(['/'])
  }

  public isLogedIn() {
    return this.AuthService.isAuthenticated()
  }
}
