import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventarioComponent } from './ModuloInventario/inventario/inventario.component';
import { OrdenesTrabajoComponent } from './ModuloOrdenesTrabajo/ordenes-trabajo/ordenes-trabajo.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: InitialPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: 'ordenesTrabajo', component: OrdenesTrabajoComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
