export interface Reservacion {
  id?: number;
  dia: string;
  confirmacion: string;
  personas: number;
  zona: string;
  usuario: {
    nombre: string
  };
}
