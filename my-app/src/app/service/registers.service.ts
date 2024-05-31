import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(private http: HttpClient) { }


  payload(registerForm: any): any {
    // Correctly create and return the payload object
    return {
      username: registerForm.Username,  // accessing name property from registerForm
      password: registerForm.Password,     // accessing age property from registerForm
      name: registerForm.Name,  // accessing gender property from registerForm
    };
  }

  registerUser(payload:any):Observable<any>{
    const url = `http://localhost:3000/api/auth/register`
    return this.http.post(url,payload)
  }

  loginUser(payload:any):Observable<any>{
    const url = `http://localhost:3000/api/auth/login`
    return this.http.post(url,payload)
  }}
