import { EditProductoService } from 'src/app/services/configEdit/editProducto.service';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { NewProductoComponent } from './new-producto/new-producto.component';
import { ProductoService } from './../../../services/producto.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EditPersonalService } from 'src/app/services/configEdit/editPersonal.service';
import { DetailProductoComponent } from './detail-producto/detail-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit, AfterViewInit {

  dataSource: any;
  searchKey: any;
  listProduct$: Observable<any> = of(null);
  pageLength = 0;
  displayedColumns: string[] = ['id', 'title', 'supplier', 'category', 'quantity', 'unite_price', 'stock', 'discontinued', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService: ProductoService, private _snackBar: MatSnackBar, private dialog: MatDialog, private _serviceEdit: EditProductoService) { 
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.cargarProducto();
  }

  cargarProducto(){
    this.listProduct$ = this.productoService.getProductoService().pipe(tap(response => {
      this.dataSource = new MatTableDataSource(response);
      console.log(response);
      console.log(this.dataSource);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      
      this.pageLength = response.length;
    }));
  }

  deleteProducto(id: any, i: any) {
    Swal.fire({
      title: 'Desea eliminar?',
      //text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:"#3085d6",
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //Swal.fire('Deleted!','Your imaginary file has been deleted.', 'success');
        console.log(id);

        this.productoService.deleteProductoService(id).subscribe((res) => {
          this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => this.cargarProducto());
        },
        (err) => {
          console.log(err);
        });
        this._serviceEdit.set({});
        this._snackBar.open('Eliminado con éxito!','',{
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

  addProducto(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(NewProductoComponent, dialogConfig);
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => this.cargarProducto());
  }

  editProducto(id: any, i: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this._serviceEdit.set(i);
    this.dialog.open(EditProductoComponent, dialogConfig);
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => this.cargarProducto());
  }

  detailProducto(id:any, i:any){
    //console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this._serviceEdit.set(i)
    this.dialog.open(DetailProductoComponent, dialogConfig);
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
