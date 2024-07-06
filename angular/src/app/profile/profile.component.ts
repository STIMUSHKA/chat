import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.currentUser = this.authService.getCurrentUserFromLocal();     

      this.authService.getCurrentUser().subscribe( user => {
        console.log(user)
        this.currentUser = user;
      })
    }   
  }

  public logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
