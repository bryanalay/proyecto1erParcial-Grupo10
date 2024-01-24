import { Component } from '@angular/core';
import { AutenticacionServiceService } from '../autenticacion-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent {
  constructor(private authservice: AutenticacionServiceService, private router: Router) {}

  //cuando se inicia el componente se verifica si el usuario esta logueado revisando localstorage
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token');
      if (token) {
        var usuario = localStorage.getItem('usuario')!;
          this.authservice.login(usuario);
          this.router.navigate(['/inventario']);
      }
    }
  }
}
