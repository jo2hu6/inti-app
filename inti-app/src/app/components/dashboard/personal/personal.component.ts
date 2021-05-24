import { Empleado } from './../../../interfaces/empleado';
import { PersonalService } from '../../../services/personal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  dataSource: any;
  searchKey: any;
  listPersonal:any;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'puesto', 'telefono', 'dni', 'direccion','acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personalService: PersonalService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal(){
    this.personalService.getPersonal().subscribe((res) => {
      this.dataSource = res;
      this.listPersonal = res;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deletePersonal(id:any, i:any){
    console.log(id);
    if(window.confirm('Seguro quiere eliminar?')){
      this.personalService.deletePersonal(id).subscribe((res) => {
        this.cargarPersonal();
      })
    }
    this._snackBar.open('Eliminado con éxito!','',{
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
