// signup.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/users'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
