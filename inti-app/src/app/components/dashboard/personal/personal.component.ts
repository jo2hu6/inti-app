import { Empleado } from './../../../interfaces/empleado';
import { PersonalService } from '../../../services/personal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  data:any;
  Employees: any = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'puesto', 'telefono', 'dni', 'direccion'];
  constructor(private employeeService: PersonalService) { }

  ngOnInit(): void {
    this.employeeService.getData().subscribe((res) => {
      console.log(res);
      this.Employees = res;
    });
  }

}
