import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Empleado } from 'src/app/interfaces/empleado';
import { EditPersonalService } from 'src/app/services/configEdit/editPersonal.service';
import { PersonalService } from 'src/app/services/personal.service';
import { PersonalComponent } from '../personal.component';

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.css']
})
export class EditPersonalComponent implements OnInit {

  personalForm: FormGroup;
  dataSource: any;
  id!: number;
  getId: any;
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
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private _serviceEdit: EditPersonalService) {
      this.personalService.getPersonalIdService(this._serviceEdit.get().id).subscribe((res) => {
        this.personalForm.setValue({
          firstname: res.firstname,
          lastname: res.lastname,
          job_title: res.job_title,
          phone: res.phone,
          dni: res.dni,
          address: res.address,
        });
      });
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
    this.listPersonal$ = this.personalService.getPersonalService().pipe(tap(response => {
      this.dataSource = new MatTableDataSource(response);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      
      this.pageLength = response.length;
    }));
  }

  editNewPersonal():any{
    console.log(this.personalForm.value);
    this.personalService.editPersonalService(this._serviceEdit.get().id, this.personalForm.value).subscribe(() => {
      console.log('La dataaaa ha llegaoooo');
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard/personal'));
      this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => this.cargarPersonal());
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
