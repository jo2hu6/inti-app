import { Empleado } from './../interfaces/empleado';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PersonalService {

  REST_API: string = 'http://localhost:3000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getPersonalService(): Observable<any> {
    return this.http.get(`${this.REST_API}/employee`).pipe(catchError(this.handleError));;
  }

  deletePersonalService(id:any): Observable<any>{
    let API_URL = `${this.REST_API}/employee/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(catchError(this.handleError));
  }

  addPersonalService(data: any):Observable<any>{
    let API_URL = `${this.REST_API}/employee/`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }

  getPersonalIdService(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/employee/${id}`;
    return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        console.log(res);
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  editPersonalService(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/employee/${id}`;
    return this.http.put(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
