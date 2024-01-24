export interface UsuarioInterface {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  password: string;
  email: string;
  transaccion?: string;
}