export interface OrdenInterface {
  id : number;
  tarea : string;
  fecha : string;
  estado : string;
  cliente : string;
  empleadoAsignado : string;
  transaccion?: string;
}