import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  registrationSuccess = false; // Add a flag to track registration success/failure
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Mobile should be 10 digits.
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.signupService.signup(userData).subscribe(
        (response) => {
          // Registration successful, handle the response as needed
          console.log('Registration successful!', response);
          this.registrationSuccess = true;
          // Redirect to the dashboard after a delay
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000); // Redirect after 2 seconds (adjust as needed)
        },
        (error) => {
          // Handle registration error
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
