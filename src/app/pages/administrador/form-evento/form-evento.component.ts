import { Component, OnInit } from '@angular/core';
import {FotoModel} from '../../../models/foto.model';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';
import {EventoModel} from '../../../models/evento.model';
import {ApiServices} from '../../../services/api.services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss']
})
export class FormEventoComponent implements OnInit {

  evento = new EventoModel();
  title: string;
  btnString: string;
  isLoadingFoto: boolean;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  archivos: FotoModel[] = [];
  underDrop: boolean = false;
  fotosubida: any[] = [];

  constructor( private _storage: AngularFireStorage, private apiservices: ApiServices,
               private router: ActivatedRoute) {
    if (router.snapshot.params.id) {
      const id = router.snapshot.params.id;
      this.title = 'Edita el evento';
      this.btnString = 'Editar';
      this.apiservices.obtenerEventoById(id).subscribe( (resp: any) => {
        this.evento.fecha = resp.data.fecha;
        this.evento.nombre = resp.data.nombre;
        this.evento.informacion = resp.data.informacion;
        this.fotosubida.push(resp.data.foto);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.title = 'Registra un evento';
      this.btnString = 'Registrar';
    }
  }

  ngOnInit() {
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
    const filepath = `eventos/fotos/${randomId}`;

    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( (url) => {
          console.log(url);
          this.evento.foto = url;
          this.fotosubida.push(url);
          this.isLoadingFoto = false;
          console.log(this.fotosubida);
        });
      })).subscribe();
  }

  accion(form: NgForm) {
    console.log(form);
    if (this.router.snapshot.params.id) {
      this.editarEvento();
    } else {
      this.registrarEvento();
    }
  }

  registrarEvento() {
    return this.apiservices.registrarEvento(this.evento).subscribe( (resp:any) => {
      Swal.fire({
        icon: 'success',
        title: 'Se ha registrado correctamente el evento',
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  editarEvento() {
    return this.apiservices.editarEvento(this.evento).subscribe( (resp:any) => {
      Swal.fire({
        icon: 'success',
        title: 'Se ha editado correctamente el evento',
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  eliminarFoto() {
    this.fotosubida.splice(0, 1);
  }
}
