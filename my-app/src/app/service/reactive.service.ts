import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReactiveService {

  constructor(private http: HttpClient) { }

  getGender():Observable<any>{
    const url = `http://localhost:3000/api/status/gender`
    return this.http.get(url)
  }

  payload(userForm: any): any {
    // Correctly create and return the payload object
    return {
      name: userForm.Name,  // accessing name property from userForm
      age: userForm.Age,     // accessing age property from userForm
      gender: userForm.gender,  // accessing gender property from userForm
      category: userForm.Category  // accessing category property from userForm
    };
  }

  postFeedback(payload:any):Observable<any>{
    const url = `http://localhost:3000/api/status/feedback`
    return this.http.post(url,payload)
  }

  
}
