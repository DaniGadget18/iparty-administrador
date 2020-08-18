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
  fotosubida: any[] = [];

  constructor( private _storage: AngularFireStorage, private apiservices: ApiServices,
               private router: ActivatedRoute) {
    if (router.snapshot.params.id) {
      const id = router.snapshot.params.id;
      this.title = 'Edita el evento';
      this.btnString = 'Editar';
      this.apiservices.obtenerEventoById(id).subscribe( (resp: any) => {
        console.log(resp);
        this.evento.fecha = resp.data.fecha;
        this.evento.nombre = resp.data.nombre;
        this.evento.informacion = resp.data.informacion;
        this.fotosubida.push(resp.data.foto);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexion',
          showConfirmButton: false,
          timer: 1500
        });
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
          this.evento.foto = url;
          this.fotosubida.push(url);
          this.isLoadingFoto = false;
        });
      })).subscribe();
  }

  accion(form: NgForm) {
    if (this.router.snapshot.params.id) {
      this.evento.id = this.router.snapshot.params.id;
      this.evento.foto = this.fotosubida[0];
      this.editarEvento();
    } else {
      this.registrarEvento();
    }
  }

  registrarEvento() {
    if (this.evento.nombre == null || this.evento.informacion == null || this.evento.nombre == ""|| this.evento.fecha == null || this.evento.fecha == "" || this.evento.informacion == ""){
      if (this.evento.nombre == null || this.evento.nombre == "") {
        var undefin="Ingrese el nomblre del evento"
      }
      else if(this.evento.informacion == null || this.evento.informacion == ""){
        var undefin="Ingrese la informacion del evento"
      }
      else{
        var undefin="Ingrese la fecha del evento"
      }
      Swal.fire({
        icon: 'error',
        title: undefin,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
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
  }
  editarEvento() {
    return this.apiservices.editarEvento(this.evento).subscribe( (resp:any) => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: 'Se ha editado correctamente el evento',
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      console.log(error);
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
