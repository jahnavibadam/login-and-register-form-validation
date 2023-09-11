// navbar-visibility.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarVisibilityService {
  private showLoginSignupSubject = new BehaviorSubject<boolean>(true);
  showLoginSignup$ = this.showLoginSignupSubject.asObservable();

  updateVisibility(show: boolean) {
    this.showLoginSignupSubject.next(show);
  }
}
