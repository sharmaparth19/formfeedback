import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getDataFeedback():Observable<any>{
    const url = `http://localhost:3000/api/status/response`;
    return this.http.get(url)
  }

  deleteFeedback(id:string){
    const url = `http://localhost:3000/api/status/feedback/${id}`;
    return this.httpDelete(url,{})
  }

  httpDelete(url: string,body:any) {
    return this.http.delete(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body
    }).pipe(
      map(response => {
        return <any>response
 
      }),
      catchError(this.handleError)
    );
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // console.error('An error occurred:', error.error.message);
      return throwError(() => error.error.message);
    } else if (error && error.status) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      return throwError(() => `Backend returned code ${error.status} body was: ${error.message || error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(() => 'Something bad happened; please try again later.');
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

  editFeedback(id:string,payload:any):Observable<any>{
    const url = `http://localhost:3000/api/status/feedback/${id}`;
    return this.http.put(url,payload)
  }
}
