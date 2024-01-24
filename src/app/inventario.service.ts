import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventarioInterface } from './interfaces/InventarioInterface';
import { SP } from 'src/Shared/SP'; 
const { Inventario } = SP;

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  baseUrl = 'https://localhost:7091/api/Inventario/';
  tk = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  
  getInventario(){
    return this.http.get(this.baseUrl+`InventarioTr?transaction=${Inventario.InventarioTr.transaction}`, {headers: {Authorization: `Bearer ${this.tk}`}});
  }

  saveInventario(data: InventarioInterface){
    return this.http.post(this.baseUrl+`PostInventario`, data, {headers: {Authorization: `Bearer ${this.tk}`}});
  }

  deleteItem(id: number){
    return this.http.delete(this.baseUrl+`DeleteInventario?transaction=${Inventario.DeleteInventario.transaction}&id=${id}`, {headers: {Authorization: `Bearer ${this.tk}`}});
  }

  updateInventario(data: InventarioInterface){
    return this.http.patch(this.baseUrl+`UpdateInventario?transaction=${Inventario.UpdateInventario.transaction}`, data, {headers: {Authorization: `Bearer ${this.tk}`}});
  }
}
