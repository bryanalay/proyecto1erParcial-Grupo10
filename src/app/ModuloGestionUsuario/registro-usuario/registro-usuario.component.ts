import { Component } from '@angular/core';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  UsuarioArray: Usuario[] = [
    {Id: 1, Ced: 5487415814, Name: "Antho Sarmiento", NumTel: 1578998548, Core: "anthonskrant_an@outlook.com"},
    {Id: 2, Ced: 1207414614, Name: "Pedro Velez", NumTel: 4878965425, Core: "siscopacket@outlook.com"},
    {Id: 3, Ced: 1207414614, Name: "Karen Gonzales", NumTel: 4878965425, Core: "siscopacket@outlook.com"}
  ];

   seleccionarUsuario: Usuario = new Usuario();

   Editar(Usuarios: Usuario){
    this.seleccionarUsuario = Usuarios;
  }
   RegistrarEditar(){
    if(this.seleccionarUsuario.Id==0){
    this.seleccionarUsuario.Id = this.UsuarioArray.length + 1;
    this.UsuarioArray.push(this.seleccionarUsuario); 
  }
    this.seleccionarUsuario = new Usuario();
  }
}
