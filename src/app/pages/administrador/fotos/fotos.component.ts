import {Component, Input, OnInit, Output} from '@angular/core';
import {Foto, FotoModel} from '../../../models/foto.model';
import {ApiFotosServices} from '../../../services/fotos-api.services';
import {Observable} from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';

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
  underDrop: boolean = false;
  constructor( private apiservices: ApiFotosServices,
               private storage: AngularFireStorage) {
    this.apiservices.obtenerFotosNegocio().subscribe( (resp: Foto) => {
      this.fotos = resp.data[0]['fotos'];
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

}
