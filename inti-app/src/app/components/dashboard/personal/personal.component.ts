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

  constructor(private personalService: PersonalService, private _snackBar: MatSnackBar, private dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal(){
    this.listPersonal$ = this.personalService.getPersonalService().pipe(tap(response => {
      this.dataSource = new MatTableDataSource(response);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      
      this.pageLength = response.length;
    }));
    /*this.personalService.getPersonalService().subscribe((res:any) => {
      this.dataSource = res;
      this.listPersonal = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/
  }

  deletePersonal(id:any, i:any){
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
