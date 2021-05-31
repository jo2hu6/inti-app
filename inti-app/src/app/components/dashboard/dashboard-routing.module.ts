import { LoginGuard } from './../../guards/login.guard';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { PersonalComponent } from './personal/personal.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  component: DashboardComponent, /*canActivate:[LoginGuard] ,*/children: [
    { path: 'inicio', component: InicioComponent },
    { path: 'personal', component: PersonalComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'ventas', component: VentasComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
