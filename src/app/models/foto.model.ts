export class FotoModel {
  public idnegocio: any;
  public archivo: File;
  public nombre: string;
  public url: string;
  public subiendo: boolean;
  public progeso: number;

  constructor( archivo: File ) {
    this.archivo = archivo;
    this.nombre = archivo.name;
    this.subiendo = false;
    this.progeso = 0;
  }
}

export interface Foto {
    foto: string;
}
