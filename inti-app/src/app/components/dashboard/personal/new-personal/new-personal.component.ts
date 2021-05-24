import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonalService } from './../../../../services/personal.service';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonalComponent } from '../personal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empleado } from 'src/app/interfaces/empleado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-new-personal',
  templateUrl: './new-personal.component.html',
  styleUrls: ['./new-personal.component.css']
})
export class NewPersonalComponent implements OnInit {

  personalForm: FormGroup;
  dataSource: any;
  listPersonal: Empleado[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private personalService:PersonalService,
    private ngZone: NgZone,
    private router: Router,
    public dialogRef: MatDialogRef<PersonalComponent>,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder) {
      this.personalForm = this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        job_title: [''],
        phone: [''],
        dni: [''],
        address: ['']
      });
    }

  ngOnInit(): void {
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

  addNewPersonal():any{
    this.personalService.addPersonalService(this.personalForm.value).subscribe(() => {
      console.log('La dataaaa ha llegaoooo');
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard/personal'));
      this.cargarPersonal();
    },
    (err) => {
      console.log(err);
    })
    this._snackBar.open('Agregado con éxito!','',{
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  cancel(){
    this.dialogRef.close();
  }

}
