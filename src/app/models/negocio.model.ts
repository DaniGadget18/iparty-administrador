export class NegocioModel {
  id: any;
  nombre: string;
  ubicacion: string;
  informacion: string;
  idcategoria: any;
  lat: any;
  lng: any;
}

export interface Negocio {
  data: {
    id: any;
    nombre: string;
    ubicacion: string;
    informacion: string;
    idcategoria: any;
    lat: any;
    lng: any;
  };
}
