export class EventoModel {
  id: any;
  fecha: string;
  nombre: string;
  informacion: string;
  foto: string;
}

export interface Evento {
  id?: number;
  foto: string;
  nombre: string;
  fecha: string;
}
