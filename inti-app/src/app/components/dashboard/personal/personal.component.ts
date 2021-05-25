import { EditPersonalComponent } from './edit-personal/edit-personal.component';
import { NewPersonalComponent } from './new-personal/new-personal.component';
import { Empleado } from './../../../interfaces/empleado';
import { PersonalService } from '../../../services/personal.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EditPersonalService } from 'src/app/services/configEdit/editPersonal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, AfterViewInit {

  dataSource: any;
  searchKey: any;
  listPersonal$: Observable<any> = of(null);
  pageLength = 0;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'job_title', 'phone', 'dni', 'address','acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personalService: PersonalService, private _snackBar: MatSnackBar, private dialog: MatDialog, private _serviceEdit: EditPersonalService) { 
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal(){
    this.listPersonal$ = this.personalService.getPersonalService().pipe(tap(response => {
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      
      this.pageLength = response.length;
    }));
  }

  deletePersonal(id: any, i: any) {
    Swal.fire({
      title: 'Desea eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar',
      cancelButtonText: 'No, regresar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'Eliminado con éxito!.', 'success');
        this.personalService.deletePersonalService(id).subscribe((res) => {
        this.cargarPersonal();
      });
      } else 
        if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  addPersonal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(NewPersonalComponent, dialogConfig);
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => this.cargarPersonal());
  }

  editPersonal(id: any, i: any){
    console.log(id);
    console.log(i);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this._serviceEdit.set(i)
    this.dialog.open(EditPersonalComponent, dialogConfig);
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => this.cargarPersonal());
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
