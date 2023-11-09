import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}
  hide = true;
  tmp_usuario: any;

  usuarioLogin = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  validarAcceso(){
    this.tmp_usuario = this.usuarioLogin.value.usuario;
    if(this.tmp_usuario == 'bryan' && this.usuarioLogin.value.password =='12345'){
      this.router.navigate(['/dashboard'])
    }else{
      alert('Usuario o contraseña incorrectos');
    }
  }
}
