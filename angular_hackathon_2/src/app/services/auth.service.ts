// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { NavbarVisibilityService } from './navbar-visibility.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Replace with your JSON-Server API endpoint

  // Use a BehaviorSubject to track authentication status
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // Expose an Observable to components for authentication status
  authStatus = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private navbarVisibilityService: NavbarVisibilityService
  ) {}

  // Authenticate user by checking username and password against JSON-Server data
  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u) => {
          return u.email == username && u.password == password;
        });
        if (user) {
          // Authentication successful
          const isAuthenticated = true;
          this.isAuthenticatedSubject.next(isAuthenticated);
          console.log('Authentication successful');
          localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data in localStorage
          const authToken = 'your-auth-token';
          localStorage.setItem("key", authToken);
          this.navbarVisibilityService.updateVisibility(false);
          return true;
        } else {
          // Authentication failed
          console.log('Authentication failed');
          return false;
        }
      })
    );
  }

  // Logout the user
  logout(): void {
    console.log('logged out');
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem("key");
    this.navbarVisibilityService.updateVisibility(true);
    
  }

  // Check if a user is currently authenticated
  isAuthenticated(): boolean {
    console.log('isAuthenticated:', !!localStorage.getItem('currentUser'));
    return !!localStorage.getItem('currentUser');
  }
}
