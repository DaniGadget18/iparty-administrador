export interface Comentario {
  id?: number;
  comentario: string;
  calificacion: number;
  usuario: {
    nombre: string
  };
}
