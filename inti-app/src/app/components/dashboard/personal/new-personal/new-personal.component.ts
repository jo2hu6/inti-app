import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonalService } from './../../../../services/personal.service';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PersonalComponent } from '../personal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empleado } from 'src/app/interfaces/empleado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-personal',
  templateUrl: './new-personal.component.html',
  styleUrls: ['./new-personal.component.css']
})
export class NewPersonalComponent implements OnInit {

  personalForm: FormGroup;
  dataSource: any;
  pageLength = 0;
  listPersonal$: Observable<any> = of(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private personalService:PersonalService,
    private ngZone: NgZone,
    private router: Router,
    public dialogRef: MatDialogRef<PersonalComponent>,
    private _snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private dialog: MatDialog) {
      this.personalForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['',Validators.required],
        job_title: ['',Validators.required],
        phone: ['',Validators.required],
        dni: ['',Validators.required],
        address: ['',Validators.required]
      });
    }

  ngOnInit(): void {
  }

  addNewPersonal():any{
    this.personalService.addPersonalService(this.personalForm.value).subscribe(() => {
      console.log('La dataaaa ha llegaoooo');
    },
    (err) => {
      console.log(err);
    })
    this._snackBar.open('Agregado con ??xito!','',{
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
