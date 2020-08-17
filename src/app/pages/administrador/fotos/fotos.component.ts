import {Component, Input, OnInit, Output} from '@angular/core';
import {Foto, FotoModel} from '../../../models/foto.model';
import {ApiFotosServices} from '../../../services/fotos-api.services';
import {Observable} from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit {

  private urlImage: Observable<string>;
  urlNueva: any[] = [];

  fotos: Foto [] = [];
  archivos: FotoModel[] = [];
  underDrop = false;
  constructor( private apiservices: ApiFotosServices,
               private storage: AngularFireStorage) {
    this.apiservices.obtenerFotosNegocio().subscribe( (resp: any) => {
      this.fotos = resp.data;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexion',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  ngOnInit() {
  }

  subirfotos() {
    for ( const item of this.archivos ) {
      item.subiendo = true;
      if ( item.progeso >= 100 ) {
        continue;
      }
      const id = Math.random().toString(36).substring(2);
      const filePath = `imagenes_negocio/${id}_${item.nombre}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.archivo);
      task.percentageChanges().subscribe(( resp: any) => {
        item.progeso = resp;
        if (resp >= 100) {
          item.subiendo = false;
        }
      });
      task.snapshotChanges().pipe(
        finalize( () => {
          ref.getDownloadURL().subscribe( (url) => {
            item.url = url;
            this.urlNueva.push(url);
            this.apiservices.guardarImagenBD({nombre: item.nombre, url: item.url});
          });
        })).subscribe();
    }
  }

  limpiarFotos() {
    this.archivos = [];
  }

  eliminarFoto( id: number ) {
    console.log(id);
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Vas a eliminar esta foto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si, borrar',
      }).then((result) => {
        if (result.value) {
          this.apiservices.eliminarFotoNegocio(id).subscribe( (resp: any) => {
            Swal.fire(
              'Eliminador',
              'Esta foto / imagen fue eliminada',
              'success'
            );
          }, (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un problema',
              showConfirmButton: false,
              timer: 1500
            });
          });
        }
      });
  }
}
