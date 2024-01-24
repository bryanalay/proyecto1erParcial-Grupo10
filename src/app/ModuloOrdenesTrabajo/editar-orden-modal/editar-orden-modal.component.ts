import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdenInterface } from 'src/app/interfaces/OrdenInterface';
import { OrdenService } from 'src/app/orden.service';
// import { OrdenDeTrabajo } from '../ordenes-trabajo/ordenes-trabajo.component';
import { SP } from 'src/Shared/SP';

const { Orden } = SP;

@Component({
  selector: 'app-editar-orden-modal',
  templateUrl: './editar-orden-modal.component.html',
  styleUrls: ['./editar-orden-modal.component.css']
})
export class EditarOrdenModalComponent {
  editarForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrdenInterface,
    private formBuilder: FormBuilder,
    private ordService: OrdenService
  ) {
    this.editarForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      tarea: [data.tarea, Validators.required],
      fecha: [data.fecha, Validators.required],
      estado: [data.estado, Validators.required],
      cliente: [data.cliente, Validators.required],
      empleadoAsignado: [data.empleadoAsignado, Validators.required],
      transaccion: Orden.UpdateOrden.transaction
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editarForm.valid) {
      const modifiedItem: OrdenInterface = this.editarForm.value;
      this.ordService.updateOrden(modifiedItem).subscribe((data:any)=>{
        console.log(data);
      })
      this.dialogRef.close(modifiedItem);
    }
  }
}
