import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionServiceService } from '../autenticacion-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLogged: boolean = false;

  constructor(private router: Router, private authService: AutenticacionServiceService) {}

  ngOnInit(): void {
    this.authService.authStatus.subscribe((status) => {
      console.log('Estado de autenticación actualizado:', status);
      this.isLogged = status;
    });
  }

  openlogin() {
    if (this.isLogged) {
      // Realizar lógica de cierre de sesión
      this.authService.logout();
      // Puedes redirigir a la página de inicio o hacer cualquier otra acción necesaria
      this.router.navigate(['/']);
    } else {
      // Abrir la página de inicio de sesión si no hay una sesión activa
      this.router.navigate(['/login']);
    }
  }
}
