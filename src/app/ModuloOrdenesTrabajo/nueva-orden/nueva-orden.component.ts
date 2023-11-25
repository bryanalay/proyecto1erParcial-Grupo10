import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdenDeTrabajo } from '../ordenes-trabajo/ordenes-trabajo.component';

@Component({
  selector: 'app-nueva-orden',
  templateUrl: './nueva-orden.component.html',
  styleUrls: ['./nueva-orden.component.css']
})
export class NuevaOrdenComponent {
  nuevaOrdenForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NuevaOrdenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrdenDeTrabajo,
    private formBuilder: FormBuilder
  ) {
    this.nuevaOrdenForm = this.formBuilder.group({
      tarea: ['', Validators.required],
      fecha: [new Date(), Validators.required],
      estado: ['', Validators.required],
      cliente: ['', Validators.required],
      empleadoAsignado: ['Sin asignar', Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.nuevaOrdenForm.valid) {
      const nuevaOrden: OrdenDeTrabajo = this.nuevaOrdenForm.value;
      this.dialogRef.close(nuevaOrden);
    }
  }
}
