import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PersonalComponent } from './personal/personal.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { NewPersonalComponent } from './personal/new-personal/new-personal.component';
import { EditPersonalComponent } from './personal/edit-personal/edit-personal.component';
import { DetailPersonalComponent } from './personal/detail-personal/detail-personal.component';
import { NewProductoComponent } from './productos/new-producto/new-producto.component';
import { EditProductoComponent } from './productos/edit-producto/edit-producto.component';
import { DetailProductoComponent } from './productos/detail-producto/detail-producto.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    PersonalComponent,
    ProductosComponent,
    VentasComponent,
    NewPersonalComponent,
    EditPersonalComponent,
    DetailPersonalComponent,
    NewProductoComponent,
    EditProductoComponent,
    DetailProductoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
