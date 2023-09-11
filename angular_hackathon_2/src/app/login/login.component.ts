import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router to handle navigation
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false; // Flag to indicate login error
  loginSuccess = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.authenticate(email, password).subscribe(
        (authenticated) => {
          if (authenticated) {
            this.loginSuccess = true;
            // Navigate to the dashboard or any other desired route on successful login
            // Redirect to the dashboard after a delay
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000); // Redirect after 2 seconds (adjust as needed)
          } else {
            this.loginError = true;
            // Handle authentication failure (e.g., show error message)
          }
        },
        (error) => {
          // Handle login error (e.g., display a general error message or log the error)
          // You can display a message like: "An error occurred during login. Please try again later."
          console.error('Login error:', error);
          // Optionally, you can set 'loginError' to true to show an error message to the user.
          this.loginError = true;
        }
      );
    }
  }
}
