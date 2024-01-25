import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditarOrdenModalComponent } from '../editar-orden-modal/editar-orden-modal.component';
import { NuevaOrdenComponent } from '../nueva-orden/nueva-orden.component';
import { AsignarTecnicoModalComponent } from '../asignar-tecnico-modal/asignar-tecnico-modal.component';
import { OrdenService } from 'src/app/orden.service';
import { OrdenInterface } from 'src/app/interfaces/OrdenInterface';

@Component({
  selector: 'app-ordenes-trabajo',
  templateUrl: './ordenes-trabajo.component.html',
  styleUrls: ['./ordenes-trabajo.component.css']
})
export class OrdenesTrabajoComponent implements OnInit{
  displayedColumns: string[] = ['id', 'tarea', 'fecha', 'estado', 'cliente', 'empleadoAsignado', 'acciones'];
  dataSource = new MatTableDataSource<OrdenInterface>();

  constructor(public dialog: MatDialog, private ordService: OrdenService) {}

  ngOnInit(): void {
    this.ordService.getOrdenes().subscribe((data:any)=>{
      console.log(data);
      this.dataSource.data = [...data];
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModificarDialog(element: OrdenInterface, dataSource: MatTableDataSource<OrdenInterface>): void {
    const dialogRef = this.dialog.open(EditarOrdenModalComponent, {
      width: '300px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result: OrdenInterface) => {
      if (result) {
        const index = dataSource.data.findIndex(item => item.id === result.id);
        if (index >= 0) {
          dataSource.data[index] = result;
          dataSource.data = [...dataSource.data];
        }
      }
    });
  }

  modify(element: OrdenInterface, dataSource: MatTableDataSource<OrdenInterface>) {
    this.openModificarDialog(element, dataSource);
  }

  openNuevoDialog(): void {
    const dialogRef = this.dialog.open(NuevaOrdenComponent, {
      width: '300px',
      data: { tarea: '', fecha: '', estado: '', cliente: '', empleadoAsignado: ''},
    });

    dialogRef.afterClosed().subscribe((result: OrdenInterface) => {
      if (result) {
        const nextId = this.dataSource.data.length > 0 ? Math.max(...this.dataSource.data.map(item => item.id)) + 1 : 1;
        result.id = nextId;
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  eliminar(element: OrdenInterface, dataSource: MatTableDataSource<OrdenInterface>): void {
    const index = dataSource.data.indexOf(element);

    if (index >= 0) {
      dataSource.data.splice(index, 1);
      console.log("este es el index de elemento a eliminar", index);
      this.ordService.deleteOrden(element.id).subscribe((data:any)=>{
        console.log(data);
      })

      dataSource.data = [...dataSource.data];
    }
    console.log('Eliminar clickeado:', element);
  }

  openEditarEmpleadoDialog(element: OrdenInterface): void {
    const dialogRef = this.dialog.open(AsignarTecnicoModalComponent, {
      width: '300px',
      data: { empleadoAsignado: element.empleadoAsignado,
      id: element.id},
    });

    dialogRef.afterClosed().subscribe((result: { empleadoAsignado: string }) => {
      if (result) {
        const index = this.dataSource.data.findIndex(item => item.id === element.id);
        if (index >= 0) {
          this.dataSource.data[index].empleadoAsignado = result.empleadoAsignado;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }
}
