import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  REST_API: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${this.REST_API}/employee`);
  }

}
