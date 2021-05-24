import { NewPersonalComponent } from './new-personal/new-personal.component';
import { Empleado } from './../../../interfaces/empleado';
import { PersonalService } from '../../../services/personal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  dataSource: any;
  searchKey: any;
  listPersonal: Empleado[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'puesto', 'telefono', 'dni', 'direccion','acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personalService: PersonalService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal(){
    this.personalService.getPersonalService().subscribe((res) => {
      this.dataSource = res;
      this.listPersonal = this.dataSource;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deletePersonal(id:any, i:any){
    console.log(id);
    if(window.confirm('Seguro quiere eliminar?')){
      this.personalService.deletePersonalService(id).subscribe((res) => {
        this.cargarPersonal();
      })
    }
    this._snackBar.open('Eliminado con éxito!','',{
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  addPersonal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(NewPersonalComponent, dialogConfig);
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
