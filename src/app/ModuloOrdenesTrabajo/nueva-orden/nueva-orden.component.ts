import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdenInterface } from 'src/app/interfaces/OrdenInterface';
import { OrdenService } from 'src/app/orden.service';
import { SP } from 'src/Shared/SP';
const { Orden } = SP;

@Component({
  selector: 'app-nueva-orden',
  templateUrl: './nueva-orden.component.html',
  styleUrls: ['./nueva-orden.component.css']
})
export class NuevaOrdenComponent {
  nuevaOrdenForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NuevaOrdenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrdenInterface,
    private formBuilder: FormBuilder,
    private ordService: OrdenService
  ) {
    this.nuevaOrdenForm = this.formBuilder.group({
      tarea: [data.tarea, Validators.required],
      fecha: new Date(),
      estado: [data.estado, Validators.required],
      cliente: [data.cliente, Validators.required],
      empleadoAsignado: "",
      transaccion: Orden.PostOrden.transaction,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.nuevaOrdenForm.valid) {
      const nuevaOrden: OrdenInterface = this.nuevaOrdenForm.value;
      this.ordService.saveOrden(nuevaOrden).subscribe((data:any)=>{
        console.log(data);
      })
      this.dialogRef.close(nuevaOrden);
    }
  }
}
