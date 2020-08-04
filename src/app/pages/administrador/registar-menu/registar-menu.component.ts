import { Component, OnInit } from '@angular/core';
import {MenuModel} from '../../../models/menu.model';
import {ApiServices} from '../../../services/api.services';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {ActivatedRoute, RouterEvent, RouterLink, RouterLinkActive, RouterState} from '@angular/router';

@Component({
  selector: 'app-registar-menu',
  templateUrl: './registar-menu.component.html',
  styleUrls: ['./registar-menu.component.scss']
})
export class RegistarMenuComponent implements OnInit {

  categorias:any [] = [];
  menu = new MenuModel();
  title: string;
  btnString: string;

  constructor( private apiservices: ApiServices,
               private router: ActivatedRoute) {
    if (this.router.snapshot.params.id) {
      this.title = 'Editar un producto';
      this.btnString = 'Editar';
      this.apiservices.obtenerMenuid(this.router.snapshot.params.id).subscribe( (resp: any) => {
        console.log(resp);
        this.menu.id = resp.data.id;
        this.menu.nombre = resp.data.nombre;
        this.menu.informacion = resp.data.informacion;
        this.menu.idcategoriamenu = resp.data.id_categoria;
      });
    } else {
      this.title = 'Registra un producto';
      this.btnString = 'Guardar';
    }
    this.apiservices.obtenerCategoriasMenu().subscribe( (resp: any) => {
      this.categorias = resp.data;
    });
  }

  ngOnInit() {
  }

  cargarInformacion(form: NgForm) {
    // Sentencia validacion
    if (this.btnString == 'Editar') {
      this.editarProductoNegocio();
    } else {
      this.crearProductoNegocio();
    }
  }

  private crearProductoNegocio() { 
    if (this.menu.nombre == null || this.menu.informacion == null ||this.menu.idcategoriamenu==null || this.menu.nombre == "" || this.menu.informacion == "" ||this.menu.idcategoriamenu==""){
      if (this.menu.nombre == null|| this.menu.nombre == "") {
       var undefin="Ingrese el Nombre"
      }
      else if(this.menu.informacion == null || this.menu.informacion == "") {
        var undefin="Ingrese la Informacion"
      }
      else{
        var undefin="Ingrese la Categorias"
      }
      Swal.fire({
        icon: 'error',
        title: undefin,
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
    this.apiservices.registrarProductoNegocio(this.menu).subscribe( (resp: any) =>{
      Swal.fire({
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'success',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });}
  }

  private editarProductoNegocio() {
    this.apiservices.editarProductoNegocio(this.menu).subscribe( (resp: any) => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      Swal.fire({
        icon: 'success',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
