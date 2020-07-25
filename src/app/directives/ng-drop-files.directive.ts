import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import {FotoModel} from '../models/foto.model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FotoModel[] = [];
  @Output() underMouse: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.underMouse.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
    this.underMouse.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this._prevenirDetener( event );
    const transferencia = this._getTranseferencia( event );
    if ( !transferencia ) {
      return;
    }
    this._obtenerArchivos( transferencia.files );
    this.underMouse.emit(false);
  }

  private _getTranseferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _obtenerArchivos( archivosLista: FileList ) {
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista )) {
      const archivoTemporal = archivosLista[propiedad];
      if (this._archivoCanDrop( archivoTemporal )) {
        const nuevoArchivo = new FotoModel( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }
  }
  // Validaciones
  private _archivoCanDrop( archivo: File ): boolean {
    if (!this._existente( archivo.name ) && this._tipoArchivo(archivo.type )) {
      return true;
    } else {
      return false;
    }
  }


  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _existente( nombreArchivo: string): boolean {
    for ( const archivo of this.archivos ) {
      if (archivo.nombre === nombreArchivo) {
        console.log('El archivo' + nombreArchivo + 'ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private _tipoArchivo( tipoArchivo: string ): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

}
