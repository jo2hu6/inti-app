import { Empleado } from './../../interfaces/empleado';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EditPersonalService {

  constructor() { }

  personalConfigEdit:Empleado = {};

  get(){
    return this.personalConfigEdit;
  }

  set(personal:Empleado){
    this.personalConfigEdit = personal;
  }

}
