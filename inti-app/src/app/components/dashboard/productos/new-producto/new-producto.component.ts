import { ProductosComponent } from './../productos.component';
import { ProductoService } from './../../../../services/producto.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empleado } from 'src/app/interfaces/empleado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

  productoForm: FormGroup;
  dataSource: any;
  pageLength = 0;
  listPersonal$: Observable<any> = of(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService:ProductoService,
    private ngZone: NgZone,
    private router: Router,
    public dialogRef: MatDialogRef<ProductosComponent>,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private dialog: MatDialog) {
      this.productoForm = this.formBuilder.group({
        title: ['', Validators.required],
        id_suplier: ['', Validators.required],
        id_category: ['',Validators.required],
        quantity_per_unit: ['',Validators.required],
        unite_price: ['',Validators.required],
        stock: ['',Validators.required],
        discontinued: ['',Validators.required]
      });
     }

  ngOnInit(): void {
  }

  addNewProducto():any{
    this.productoService.addProductoService(this.productoForm.value).subscribe(() => {
      console.log('La dataaaa ha llegaoooo');
    },
    (err) => {
      console.log(err);
    })
    this._snackBar.open('Agregado con éxito!','',{
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
