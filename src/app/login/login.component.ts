import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionServiceService } from '../autenticacion-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AutenticacionServiceService) {}
  hide = true;
  tmp_usuario: any;

  usuarioLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  validarAcceso() {
    this.tmp_usuario = this.usuarioLogin.value.usuario;
    if (this.tmp_usuario == 'bryan' && this.usuarioLogin.value.password == '12345') {
      this.authService.login(this.tmp_usuario);
      this.router.navigate(['/inventario']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
