import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asignar-tecnico-modal',
  templateUrl: './asignar-tecnico-modal.component.html',
  styleUrls: ['./asignar-tecnico-modal.component.css']
})
export class AsignarTecnicoModalComponent {
  editarEmpleadoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AsignarTecnicoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleadoAsignado: string },
    private formBuilder: FormBuilder
  ) {
    this.editarEmpleadoForm = this.formBuilder.group({
      empleadoAsignado: [data.empleadoAsignado, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editarEmpleadoForm.valid) {
      const nuevoEmpleado: string = this.editarEmpleadoForm.value.empleadoAsignado;
      this.dialogRef.close({ empleadoAsignado: nuevoEmpleado });
    }
  }
}
