import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { EditProductoService } from 'src/app/services/configEdit/editProducto.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductosComponent } from '../productos.component';

@Component({
  selector: 'app-detail-producto',
  templateUrl: './detail-producto.component.html',
  styleUrls: ['./detail-producto.component.css']
})
export class DetailProductoComponent implements OnInit {

  productoForm: FormGroup;
  productoList: any [] = [];
  dataSource: any;
  id!: number;
  getId: any;
  pageLength = 0;
  listPersonal$: Observable<any> = of(null);

  constructor(
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<ProductosComponent>,
    public formBuilder: FormBuilder,
    private _serviceEdit: EditProductoService) {
      
      this.productoService.getProductoIdService(this._serviceEdit.get().id).subscribe((res) => {
        console.log(res);
        this.productoForm.setValue({
          title: res.tittle,
          id_suplier: res.id_supplier,
          id_category: res.id_category,
          quantity_per_unit: res.quantity_per_unit,
          unite_price: res.unite_price,
          stock: res.stock,
          discontinued: res.discontinued
        });

        this.productoList = [res];

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

  detailProductoSelect():any{
    this._serviceEdit.set({});
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
