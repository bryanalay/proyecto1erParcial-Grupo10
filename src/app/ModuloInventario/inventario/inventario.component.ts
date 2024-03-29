import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarModalComponent } from '../editar-modal/editar-modal.component';
import { NewProductDialogComponent } from '../new-product-dialog/new-product-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from 'src/app/inventario.service';
import { InventarioInterface } from 'src/app/interfaces/InventarioInterface';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'cantidad', 'actions'];
  dataSourcePiezas = new MatTableDataSource<InventarioInterface>();
  dataSourceMateriales = new MatTableDataSource<InventarioInterface>();

  constructor(public dialog: MatDialog, private invService: InventarioService) {}

  ngOnInit(): void {
    this.invService.getInventario().subscribe((data:any)=>{
      console.log(data);
      //filtro para tipo 1
      const data1:any = data.filter((item:InventarioInterface)=>item.tipo==1);
      const data2:any = data.filter((item:InventarioInterface)=>item.tipo==2);

      this.dataSourcePiezas.data = [...data1];
      this.dataSourceMateriales.data = [...data2];
    })

  }

  applyFilterPiezas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePiezas.filter = filterValue.trim().toLowerCase();
  }

  applyFilterMateriales(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMateriales.filter = filterValue.trim().toLowerCase();
  }

  modify(element: InventarioInterface, dataSource: MatTableDataSource<InventarioInterface>) {
    this.openModifyDialog(element, dataSource);
  }

  delete(element: InventarioInterface, dataSource: MatTableDataSource<InventarioInterface>) {
    const index = dataSource.data.indexOf(element);

    if (index >= 0) {
      dataSource.data.splice(index, 1);
      console.log("este es el index de elemento a eliminar", index);
      this.invService.deleteItem(element.id).subscribe((data:any)=>{
        console.log(data);
      })
      dataSource.data = [...dataSource.data];
    }
    console.log('Eliminar clickeado:', element);
  }

  openModifyDialog(element: InventarioInterface, dataSource: MatTableDataSource<InventarioInterface>): void {
    const dialogRef = this.dialog.open(EditarModalComponent, {
      width: '300px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result: InventarioInterface) => {
      if (result) {
        const index = dataSource.data.findIndex(item => item.id === result.id);
        if (index >= 0) {
          dataSource.data[index] = result;
          dataSource.data = [...dataSource.data];
        }
      }
    });
  }

  openNuevoDialog(dataSource: MatTableDataSource<InventarioInterface>,tipo:number): void {
    const dialogRef = this.dialog.open(NewProductDialogComponent, {
      width: '300px',
      data: { id: null, nombre: '', descripcion: '', cantidad: null, tipo: tipo},
    });

    dialogRef.afterClosed().subscribe((result: InventarioInterface) => {
      console.log("este es el resultado del subscribe", result);
      if (result) {
        // Encuentra el último ID en el dataSource
        const ultimoId = dataSource.data.reduce((maxId, item) => Math.max(maxId, item.id || 0), 0);
        
        // Asigna el nuevo ID como el último ID + 1
        result.id = ultimoId + 1;
  
        // Agrega el nuevo elemento al dataSource
        const coso = [...dataSource.data, result];
        console.log("este es el coso", coso);
        this.dataSourcePiezas.data = coso;
      }
    });
  }
}
