import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavbarVisibilityService } from 'src/app/services/navbar-visibility.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; 
  showLoginSignup = true; 
  constructor(
    private router: Router,
    private authService: AuthService,
    private navbarVisibilityService: NavbarVisibilityService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    console.log('xx', this.isLoggedIn);

    this.authService.authStatus.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    });

    this.navbarVisibilityService.showLoginSignup$.subscribe((show) => {
      this.showLoginSignup = show;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}