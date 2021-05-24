import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  REST_API: string = 'http://localhost:3000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getPersonal(){
    return this.http.get(`${this.REST_API}/employee`);
  }

  deletePersonal(id:any): Observable<any>{
    let API_URL = `${this.REST_API}/employee/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders})
  }

}
