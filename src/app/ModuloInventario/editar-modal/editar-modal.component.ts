import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PiezaMaterial } from '../inventario/inventario.component';
import { InventarioInterface } from 'src/app/interfaces/InventarioInterface';
import { InventarioService } from 'src/app/inventario.service';
import { SP } from 'src/Shared/SP';

const { Inventario } = SP;

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.css']
})
export class EditarModalComponent {
  modifyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventarioInterface,
    private formBuilder: FormBuilder,
    private invService: InventarioService
  ) {
    this.modifyForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      transaccion: Inventario.UpdateInventario.transaction,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.modifyForm.valid) {
      const modifiedItem: InventarioInterface = this.modifyForm.value;

      this.invService.updateInventario(modifiedItem).subscribe((data:any)=>{
        console.log(data);
      })
      this.dialogRef.close(modifiedItem);
    }
  }
}
