import { SupplierService } from './../../../../services/supplier.service';
import { ProductosComponent } from './../productos.component';
import { ProductoService } from './../../../../services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit, AfterViewInit {

  productoForm: FormGroup;
  dataSource: any;
  suppliersList: any [] = [];
  categoryList: any [] = [];
  supplierSelected: String | undefined;
  pageLength = 0;
  listPersonal$: Observable<any> = of(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService:ProductoService,
    public dialogRef: MatDialogRef<ProductosComponent>,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private categoryService: CategoryService) {
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
    this.addSupplierToList();
    this.addCategoryToList();
  }

  ngAfterViewInit(): void {
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

  addSupplierToList():any{
    this.supplierService.getSupplierService().subscribe((res:any) => {
      this.suppliersList = res;
    })
  }

  addCategoryToList():any{
    this.categoryService.getCategoryService().subscribe((res:any) => {
      this.categoryList = res;
    })
  }

  cancel(){
    this.dialogRef.close();
  }

}
