import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PiezaMaterial } from '../inventario/inventario.component';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.css']
})
export class NewProductDialogComponent {
  nuevoForm: FormGroup; 
  constructor(
    public dialogRef: MatDialogRef<NewProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PiezaMaterial,
    private formBuilder: FormBuilder
  ) {
    this.nuevoForm = this.formBuilder.group({
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
    if (this.nuevoForm.valid) {
      const newItem: PiezaMaterial = this.nuevoForm.value;
      this.dialogRef.close(newItem);
    }
  }
}
