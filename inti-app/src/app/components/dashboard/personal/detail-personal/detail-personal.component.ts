import { Empleado } from 'src/app/interfaces/empleado';
import { ViewChild, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { EditPersonalService } from 'src/app/services/configEdit/editPersonal.service';
import { PersonalService } from 'src/app/services/personal.service';
import { PersonalComponent } from '../personal.component';

@Component({
  selector: 'app-detail-personal',
  templateUrl: './detail-personal.component.html',
  styleUrls: ['./detail-personal.component.css']
})
export class DetailPersonalComponent implements OnInit {

  personalForm: FormGroup;
  personalList: any [] = [];
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

        this.personalList = [res];

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

  deltailPersonalSelect():any{
    this._serviceEdit.set({});
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
