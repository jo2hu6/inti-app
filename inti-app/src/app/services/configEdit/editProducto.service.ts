import { Producto } from './../../interfaces/producto';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EditProductoService {

  constructor() { }

  productoConfigEdit:Producto = {};

  get(){
    return this.productoConfigEdit;
  }

  set(producto:Producto){
    this.productoConfigEdit = producto;
  }

}
