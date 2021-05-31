import { ProductosComponent } from './../productos.component';
import { ProductoService } from './../../../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProductoService } from 'src/app/services/configEdit/editProducto.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {

  productoForm: FormGroup;
  dataSource: any;
  id!: number;
  getId: any;
  pageLength = 0;
  listProducto$: Observable<any> = of(null);

  constructor(
    private productoService:ProductoService,
    public dialogRef: MatDialogRef<ProductosComponent>,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private _serviceEdit: EditProductoService) {
      this.productoService.getProductoIdService(this._serviceEdit.get().id).subscribe((res) => {
        this.productoForm.setValue({
          title: res.tittle,
          id_suplier: res.id_supplier,
          id_category: res.id_category,
          quantity_per_unit: res.quantity_per_unit,
          unite_price: res.unite_price,
          stock: res.stock,
          discontinued: res.discontinued
        });
      });
      this.productoForm = this.formBuilder.group({
        title: [''],
        id_suplier: [''],
        id_category: [''],
        quantity_per_unit: [''],
        unite_price: [''],
        stock: [''],
        discontinued: ['']
      });
    }

  ngOnInit(): void {
  }

  editNewProducto():any{
    console.log(this.productoForm.value);
    this.productoService.editProductoService(this._serviceEdit.get().id, this.productoForm.value).subscribe(() => {
      console.log('La dataaaa ha llegaoooo');
    },
    (err) => {
      console.log(err);
    })
    this._serviceEdit.set({});
    this._snackBar.open('Actualizado con éxito!','',{
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
