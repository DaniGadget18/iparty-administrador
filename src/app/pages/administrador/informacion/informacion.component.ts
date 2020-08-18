import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import {Negocio, NegocioModel} from '../../../models/negocio.model';

import {ApiServices} from '../../../services/api.services';
import {UsuarioModel} from '../../../models/usuario.model';
import { MouseEvent } from '@agm/core';
import Swal from 'sweetalert2';
import {Categoria} from '../../../interfaces/categoria.interface';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  lat = 25.538653133058357 ;
  lng = -103.3950567411292;
  usuario = new UsuarioModel();
  negocio = new NegocioModel();
  categorias: Categoria[] = [];
  isLoading = true;
  isLoadingFoto: boolean;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  fotosubida: any[] = [];


  constructor( private apiservices: ApiServices, private _storage: AngularFireStorage ) {
    this.usuario.email = localStorage.getItem('email');
    this.apiservices.obtenerCategorias().subscribe( (resp: Categoria[]) => {
      console.log(resp);
      // @ts-ignore
      this.categorias = resp.data;
    });
    this.apiservices.obtenerInfoNegocio(this.usuario).subscribe( (resp: Negocio) => {
      this.negocio.nombre = resp.data[0].nombre;
      this.negocio.ubicacion = resp.data[0].ubicacion;
      this.negocio.informacion = resp.data[0].informacion;
      this.negocio.idcategoria = resp.data[0].id_categoria;
      this.negocio.lat = resp.data[0].lat;
      this.negocio.lng = resp.data[0].lng;
      this.lng = resp.data[0].lng;
      this.lat = resp.data[0].lat;
      this.isLoading = false;
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

  actulizarInfoNegocio(form: NgForm) {
    this.negocio.lat = this.lat;
    this.negocio.lng = this.lng;
    this.negocio.foto = this.fotosubida[0];

    this.apiservices.actualizarNegocio(this.negocio).subscribe( (resp: any ) => {
      Swal.fire({
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error en el sistema ' + error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  getMapClick($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  upload(event) {
    this.isLoadingFoto = true;
    if (this.fotosubida.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Ya cargaste una foto',
        text: 'Solo puede tener una foto tu evento',
      });
      return;
    }
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    const filepath = `fotos/perfil/${randomId}`;

    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( (url) => {
          this.usuario.foto = url;
          this.fotosubida.push(url);
          this.isLoadingFoto = false;
        });
      })).subscribe();
  }


}
