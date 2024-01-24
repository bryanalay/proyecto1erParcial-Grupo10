import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventarioComponent } from './ModuloInventario/inventario/inventario.component';
import {MatTableModule} from '@angular/material/table';
import { EditarModalComponent } from './ModuloInventario/editar-modal/editar-modal.component';
import { NewProductDialogComponent } from './ModuloInventario/new-product-dialog/new-product-dialog.component';
import { OrdenesTrabajoComponent } from './ModuloOrdenesTrabajo/ordenes-trabajo/ordenes-trabajo.component';
import { EditarOrdenModalComponent } from './ModuloOrdenesTrabajo/editar-orden-modal/editar-orden-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { NuevaOrdenComponent } from './ModuloOrdenesTrabajo/nueva-orden/nueva-orden.component';
import { AsignarTecnicoModalComponent } from './ModuloOrdenesTrabajo/asignar-tecnico-modal/asignar-tecnico-modal.component';
import { RegistroUsuarioComponent } from './ModuloGestionUsuario/registro-usuario/registro-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    InitialPageComponent,
    InventarioComponent,
    EditarModalComponent,
    NewProductDialogComponent,
    OrdenesTrabajoComponent,
    EditarOrdenModalComponent,
    NuevaOrdenComponent,
    AsignarTecnicoModalComponent,
    RegistroUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    HttpClientModule
  ],
  providers: [MatDatepickerModule,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
