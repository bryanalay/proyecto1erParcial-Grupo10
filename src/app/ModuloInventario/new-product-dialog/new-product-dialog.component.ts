import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventarioService } from 'src/app/inventario.service';
import { InventarioInterface } from 'src/app/interfaces/InventarioInterface';
import { SP } from 'src/Shared/SP';
const { Inventario } = SP;

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.css']
})
export class NewProductDialogComponent {
  nuevoForm: FormGroup; 
  constructor(
    public dialogRef: MatDialogRef<NewProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventarioInterface,
    private formBuilder: FormBuilder,
    private invService: InventarioService
  ) {
    this.nuevoForm = this.formBuilder.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      transaccion: Inventario.PostInventario.transaction,
      tipo: data.tipo
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.nuevoForm.valid) {
      const newItem: InventarioInterface = this.nuevoForm.value;
      console.log(newItem);
      this.invService.saveInventario(newItem).subscribe((data:any)=>{
        console.log(data);
      })
      this.dialogRef.close(newItem);
    }
  }
}
