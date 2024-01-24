import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdenInterface } from 'src/app/interfaces/OrdenInterface';
import { OrdenService } from 'src/app/orden.service';

@Component({
  selector: 'app-asignar-tecnico-modal',
  templateUrl: './asignar-tecnico-modal.component.html',
  styleUrls: ['./asignar-tecnico-modal.component.css']
})
export class AsignarTecnicoModalComponent {
  editarEmpleadoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AsignarTecnicoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleadoAsignado: string,
    id: number},
    private formBuilder: FormBuilder,
    private ordService: OrdenService
  ) {
    this.editarEmpleadoForm = this.formBuilder.group({
      empleadoAsignado: [data.empleadoAsignado, Validators.required],
      id: data.id
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editarEmpleadoForm.valid) {
      const nuevoEmpleado: OrdenInterface = this.editarEmpleadoForm.value;
      console.log("este es el nevo empleado: ", nuevoEmpleado);
      console.log("desde onsaveclick: ", this.editarEmpleadoForm.value);
      this.ordService.updateEmpleado(nuevoEmpleado).subscribe((data:any)=>{
        console.log(data);
      })
      this.dialogRef.close(nuevoEmpleado);
    }
  }
}
