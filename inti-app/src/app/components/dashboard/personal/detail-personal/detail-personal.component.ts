import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
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

  constructor(
    private personalService:PersonalService,
    public dialogRef: MatDialogRef<PersonalComponent>,
    public formBuilder: FormBuilder,
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

  detailPersonalSelect():any{
    this._serviceEdit.set({});
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
