import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  REST_API: string = 'http://localhost:3000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCategoryService(): Observable<any> {
    return this.http.get(`${this.REST_API}/category`).pipe(catchError(this.handleError));;
  }

  getCategoryIdService(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/category/${id}`;
    return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        console.log(res);
        return res || {};
      }),
      catchError(this.handleError)
    );
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
