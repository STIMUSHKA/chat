import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  public redirectLogin() {
    this.router.navigate(['/login'])
  }
  
  public redirectHome() {
    this.router.navigate(['/'])
  }
}
