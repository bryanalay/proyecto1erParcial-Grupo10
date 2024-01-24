import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SP } from 'src/Shared/SP';
import { OrdenInterface } from './interfaces/OrdenInterface';

const { Orden } = SP;

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  baseUrl = 'https://localhost:7091/api/Ordenes/';
  tk = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  
  getOrdenes(){
    return this.http.get(this.baseUrl+`OrdenesTr?transaction=${Orden.OrdenTr.transaction}`, {headers: {Authorization: `Bearer ${this.tk}`}});
  }

  saveOrden(data: OrdenInterface){
    return this.http.post(this.baseUrl+`PostOrden`, data, {headers: {Authorization: `Bearer ${this.tk}`}});
  }

  deleteOrden(id: number){
    return this.http.delete(this.baseUrl+`DeleteOrder?transaction=${Orden.DeleteOrden.transaction}&id=${id}`, {headers: {Authorization: `Bearer ${this.tk}`}});
  }

  updateOrden(data: OrdenInterface){
    return this.http.patch(this.baseUrl+`UpdateOrden?transaction=${Orden.UpdateOrden.transaction}`, data, {headers: {Authorization: `Bearer ${this.tk}`}});
  }

  updateEmpleado(data: OrdenInterface){
    return this.http.patch(this.baseUrl+`UpdateOrdenEmpleadoAsignado?id=${data.id}&empleado=${data.empleadoAsignado}`,null, {headers: {Authorization: `Bearer ${this.tk}`}});
  }
}
