import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {UsuarioModel} from '../../../models/usuario.model';
import {ApiServices} from '../../../services/api.services';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  isLoadingFoto: boolean;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  fotosubida: any[] = [];
  usuario = new UsuarioModel();

  constructor(private _storage: AngularFireStorage, private apiservices: ApiServices) {
    this.apiservices.obtenerInformacionUsuario().subscribe( (resp: any) => {
      this.usuario.nombre = resp.data.nombre;
      this.usuario.email = resp.data.foto;
    });
  }

  ngOnInit() {
  }

  editarUsuario() {
    if (this.fotosubida.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Sube una foto antes de editar',
      });
    }
    this.usuario.email = localStorage.getItem('email');
    this.apiservices.editarUsuario(this.usuario).subscribe( (resp: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Se ha editado correctamente',
      });
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
      });
    });
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
