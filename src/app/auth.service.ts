import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInterface } from './interfaces/UsuarioInterface'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:7091/api/Usuarios/UsuarioLogin';
  constructor(private http: HttpClient) { }

  login(user: UsuarioInterface){
    return this.http.post(this.baseUrl, user);
  }
}
