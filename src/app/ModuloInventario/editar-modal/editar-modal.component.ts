import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PiezaMaterial } from '../inventario/inventario.component';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.css']
})
export class EditarModalComponent {
  modifyForm: FormGroup; // Define el formulario

  constructor(
    public dialogRef: MatDialogRef<EditarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PiezaMaterial,
    private formBuilder: FormBuilder // Inyecta FormBuilder
  ) {
    // Inicializa el formulario con los datos actuales
    this.modifyForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      cantidad: [data.cantidad, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.modifyForm.valid) {
      const modifiedItem: PiezaMaterial = this.modifyForm.value;
      this.dialogRef.close(modifiedItem);
    }
  }
}
