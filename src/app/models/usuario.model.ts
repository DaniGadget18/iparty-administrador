export class UsuarioModel {
  email: string;
  nombre: string;
  foto: string;
  fecha_nacimiento: string;
  password: string;
}

export interface Usuario {
  nombre: string;
  email: string;
  foto: string;
  fecha_nacimiento: string;
  password: string;
}
