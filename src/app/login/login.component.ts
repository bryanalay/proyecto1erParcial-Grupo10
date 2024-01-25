import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionServiceService } from '../autenticacion-service.service';
import { AuthService } from '../auth.service';
import { UsuarioInterface } from '../interfaces/UsuarioInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: AuthService,private router: Router, private authService: AutenticacionServiceService) {}
  hide = true;
  tmp_usuario: any;

  usuarioLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    transaccion: new FormControl()
  });

  validarAcceso() {
    this.usuarioLogin.value.transaccion = 'USUARIO_LOGIN';
    this.tmp_usuario = this.usuarioLogin.value.usuario;

    this.service.login(this.usuarioLogin.value as UsuarioInterface).subscribe((data:any)=>{
      localStorage.setItem('usuario', this.tmp_usuario);
      localStorage.setItem('token', data);
      this.authService.login(this.tmp_usuario);
      this.router.navigate(['/inventario']);
    })
  }
}
