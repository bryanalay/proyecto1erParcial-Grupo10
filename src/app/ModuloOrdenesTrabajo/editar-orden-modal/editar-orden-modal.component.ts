import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdenDeTrabajo } from '../ordenes-trabajo/ordenes-trabajo.component';

@Component({
  selector: 'app-editar-orden-modal',
  templateUrl: './editar-orden-modal.component.html',
  styleUrls: ['./editar-orden-modal.component.css']
})
export class EditarOrdenModalComponent {
  editarForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrdenDeTrabajo,
    private formBuilder: FormBuilder
  ) {
    this.editarForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      tarea: [data.tarea, Validators.required],
      fecha: [data.fecha, Validators.required],
      estado: [data.estado, Validators.required],
      cliente: [data.cliente, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editarForm.valid) {
      const modifiedItem: OrdenDeTrabajo = this.editarForm.value;
      this.dialogRef.close(modifiedItem);
    }
  }
}
