import { Empleado } from './../../../interfaces/empleado';
import { PersonalService } from '../../../services/personal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  dataSource:any;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'puesto', 'telefono', 'dni', 'direccion','acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personalService: PersonalService) { }

  ngOnInit(): void {
    
    this.personalService.getData().subscribe((res) => {
      this.dataSource = res;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
