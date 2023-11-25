import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditarOrdenModalComponent } from '../editar-orden-modal/editar-orden-modal.component';
import { NuevaOrdenComponent } from '../nueva-orden/nueva-orden.component';
import { AsignarTecnicoModalComponent } from '../asignar-tecnico-modal/asignar-tecnico-modal.component';


export interface OrdenDeTrabajo {
  id: number;
  tarea: string;
  fecha: Date;
  estado: string;
  cliente: string;
  empleadoAsignado: string;
}

export const ORDENES_DE_TRABAJO_DATA: OrdenDeTrabajo[] = [
  { id: 1, tarea: 'Reparación de equipos', fecha: new Date('2023-01-01'), estado: 'En progreso', cliente: 'Cliente A', empleadoAsignado: 'Empleado 1' },
  { id: 2, tarea: 'Instalación de software', fecha: new Date('2023-02-15'), estado: 'Completada', cliente: 'Cliente B', empleadoAsignado: 'Empleado 2' },
  // Agrega más datos según sea necesario
];

@Component({
  selector: 'app-ordenes-trabajo',
  templateUrl: './ordenes-trabajo.component.html',
  styleUrls: ['./ordenes-trabajo.component.css']
})
export class OrdenesTrabajoComponent implements OnInit{
  displayedColumns: string[] = ['id', 'tarea', 'fecha', 'estado', 'cliente', 'empleadoAsignado', 'acciones'];
  dataSource = new MatTableDataSource<OrdenDeTrabajo>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = [
      { id: 1, tarea: 'Reparación de equipos', fecha: new Date('2023-01-01'), estado: 'En progreso', cliente: 'Cliente A', empleadoAsignado: 'Sin asignar' },
      { id: 2, tarea: 'Instalación de software', fecha: new Date('2023-02-15'), estado: 'Completada', cliente: 'Cliente B', empleadoAsignado: 'Sin asignar' },
      { id: 3, tarea: 'Mantenimiento de servidores', fecha: new Date('2023-03-10'), estado: 'Pendiente', cliente: 'Cliente C', empleadoAsignado: 'Sin asignar' },
      { id: 4, tarea: 'Actualización de firmware', fecha: new Date('2023-04-05'), estado: 'En progreso', cliente: 'Cliente D', empleadoAsignado: 'Sin asignar' },
      { id: 5, tarea: 'Configuración de red', fecha: new Date('2023-05-20'), estado: 'Completada', cliente: 'Cliente E', empleadoAsignado: 'Sin asignar' },
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModificarDialog(element: OrdenDeTrabajo, dataSource: MatTableDataSource<OrdenDeTrabajo>): void {
    const dialogRef = this.dialog.open(EditarOrdenModalComponent, {
      width: '300px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result: OrdenDeTrabajo) => {
      if (result) {
        const index = dataSource.data.findIndex(item => item.id === result.id);
        if (index >= 0) {
          dataSource.data[index] = result;
          dataSource.data = [...dataSource.data];
        }
      }
    });
  }

  modify(element: OrdenDeTrabajo, dataSource: MatTableDataSource<OrdenDeTrabajo>) {
    this.openModificarDialog(element, dataSource);
  }

  openNuevoDialog(): void {
    const dialogRef = this.dialog.open(NuevaOrdenComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: OrdenDeTrabajo) => {
      if (result) {
        // Genera el próximo ID
        const nextId = this.dataSource.data.length > 0 ? Math.max(...this.dataSource.data.map(item => item.id)) + 1 : 1;
        result.id = nextId;

        // Agrega la nueva orden a tu dataSource
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  eliminar(element: OrdenDeTrabajo, dataSource: MatTableDataSource<OrdenDeTrabajo>): void {
    const index = dataSource.data.indexOf(element);

    if (index >= 0) {
      dataSource.data.splice(index, 1);
      dataSource.data = [...dataSource.data];
    }
    console.log('Eliminar clickeado:', element);
  }

  openEditarEmpleadoDialog(element: OrdenDeTrabajo): void {
    const dialogRef = this.dialog.open(AsignarTecnicoModalComponent, {
      width: '300px',
      data: { empleadoAsignado: element.empleadoAsignado },
    });

    dialogRef.afterClosed().subscribe((result: { empleadoAsignado: string }) => {
      if (result) {
        // Actualiza el valor de empleadoAsignado en tu dataSource
        const index = this.dataSource.data.findIndex(item => item.id === element.id);
        if (index >= 0) {
          this.dataSource.data[index].empleadoAsignado = result.empleadoAsignado;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }
}
