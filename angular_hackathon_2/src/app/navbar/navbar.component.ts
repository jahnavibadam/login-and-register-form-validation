// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavbarVisibilityService } from 'src/app/services/navbar-visibility.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
// export class NavbarComponent implements OnInit {
//   isLoggedIn = false; // Initialize isLoggedIn to false

//   constructor(private router: Router, private authService: AuthService) {}

//   ngOnInit() {
//     // Check the user's authentication status when the component initializes
//     this.isLoggedIn = this.authService.isAuthenticated();
//     console.log("xx",this.isLoggedIn)
//     // Subscribe to authentication changes to update isLoggedIn
//     this.authService.authStatus.subscribe((authenticated) => {
//       this.isLoggedIn = authenticated;
//     });
//   }

//   logout() {
//     // Call the logout method of the AuthService and update isLoggedIn
//     this.authService.logout();
//     this.isLoggedIn = false;
//   }
// }
export class NavbarComponent implements OnInit {
  isLoggedIn = false; // Initialize isLoggedIn to false
  showLoginSignup = true; // Initialize to true
  constructor(
    private router: Router,
    private authService: AuthService,
    private navbarVisibilityService: NavbarVisibilityService
  ) {}

  ngOnInit() {
    // Check the user's authentication status when the component initializes
    this.isLoggedIn = this.authService.isAuthenticated();
    console.log('xx', this.isLoggedIn);
    // Subscribe to authentication changes to update isLoggedIn
    this.authService.authStatus.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    });

    // Subscribe to visibility changes for "Login" and "Signup" options
    this.navbarVisibilityService.showLoginSignup$.subscribe((show) => {
      this.showLoginSignup = show;
    });
  }

  logout() {
    // Call the logout method of the AuthService and update isLoggedIn
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}