export interface MensajeInterface {
  conversacion: number;
  foto: string;
  from: number;
  idnegocio: number;
  mensaje: string;
  nombre: string;
  to: number;
  createdAt?: string;
  _id?: string;
  idsocket: string;
}

export interface MensajeInterfaceResp {
  status: string;
  data: {
    conversacion: number;
    foto: string;
    from: number;
    idnegocio: number;
    mensaje: string;
    nombre: string;
    to: number;
    createdAt?: string;
    _id?: string;
    idsocket: string;
  };
}
