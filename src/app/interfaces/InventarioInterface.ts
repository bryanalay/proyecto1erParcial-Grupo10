export interface InventarioInterface {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  transaccion?: string;
  tipo: number;
}