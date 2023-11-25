import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarModalComponent } from '../editar-modal/editar-modal.component';
import { NewProductDialogComponent } from '../new-product-dialog/new-product-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PiezaMaterial {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'cantidad', 'actions'];
  dataSourcePiezas = new MatTableDataSource<PiezaMaterial>();
  dataSourceMateriales = new MatTableDataSource<PiezaMaterial>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSourcePiezas.data = [...PIEZAS_DATA];
    this.dataSourceMateriales.data = [...MATERIALES_DATA];
  }

  applyFilterPiezas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePiezas.filter = filterValue.trim().toLowerCase();
  }

  applyFilterMateriales(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMateriales.filter = filterValue.trim().toLowerCase();
  }

  openModifyDialog(element: PiezaMaterial, dataSource: MatTableDataSource<PiezaMaterial>): void {
    const dialogRef = this.dialog.open(EditarModalComponent, {
      width: '300px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result: PiezaMaterial) => {
      if (result) {
        const index = dataSource.data.findIndex(item => item.id === result.id);
        if (index >= 0) {
          dataSource.data[index] = result;
          dataSource.data = [...dataSource.data];
        }
      }
    });
  }

  modify(element: PiezaMaterial, dataSource: MatTableDataSource<PiezaMaterial>) {
    this.openModifyDialog(element, dataSource);
  }

  delete(element: PiezaMaterial, dataSource: MatTableDataSource<PiezaMaterial>) {
    const index = dataSource.data.indexOf(element);

    if (index >= 0) {
      dataSource.data.splice(index, 1);
      dataSource.data = [...dataSource.data];
    }
    console.log('Eliminar clickeado:', element);
  }

  openNuevoDialog(dataSource: MatTableDataSource<PiezaMaterial>): void {
    const dialogRef = this.dialog.open(NewProductDialogComponent, {
      width: '300px',
      data: { id: null, nombre: '', descripcion: '', cantidad: null },
    });

    dialogRef.afterClosed().subscribe((result: PiezaMaterial) => {
      if (result) {
        dataSource.data = [...dataSource.data, result];
        dataSource._updateChangeSubscription(); // Añadido para forzar la actualización
      }
    });
  }
}

const PIEZAS_DATA: PiezaMaterial[] = [
  { id: 1, nombre: 'Tuerca', descripcion: 'Tuerca hexagonal', cantidad: 100 },
  { id: 2, nombre: 'Tornillo', descripcion: 'Tornillo para madera', cantidad: 50 },
  { id: 3, nombre: 'Resorte', descripcion: 'Resorte de compresión', cantidad: 30 },
  { id: 4, nombre: 'Engranaje', descripcion: 'Engranaje de acero', cantidad: 25 },
  { id: 5, nombre: 'Arandela', descripcion: 'Arandela plana', cantidad: 80 },
  { id: 6, nombre: 'Perno', descripcion: 'Perno de fijación', cantidad: 40 },
];

const MATERIALES_DATA: PiezaMaterial[] = [
  { id: 1, nombre: 'Acero', descripcion: 'Plancha de acero', cantidad: 200 },
  { id: 2, nombre: 'Aluminio', descripcion: 'Perfiles de aluminio', cantidad: 80 },
  { id: 3, nombre: 'Plástico', descripcion: 'Polímero termoplástico', cantidad: 120 },
  { id: 4, nombre: 'Cobre', descripcion: 'Bobina de cobre', cantidad: 35 },
  { id: 5, nombre: 'Vidrio', descripcion: 'Placa de vidrio', cantidad: 60 },
  { id: 6, nombre: 'Madera', descripcion: 'Tablón de madera', cantidad: 90 },
];

