import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionServiceService } from './autenticacion-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AutenticacionServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authStatus.pipe(
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/login']);  // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        }
      })
    );
  }
}
