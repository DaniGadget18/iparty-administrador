import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/administrador/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {ForgetpasswordComponent} from './pages/forgetpassword/forgetpassword.component';
import {NegociosComponent} from './pages/AdministradorRoot/negocios/negocios.component';
import {RegistrarNegocioComponent} from './pages/AdministradorRoot/registrar-negocio/registrar-negocio.component';
import {AdministradoresComponent} from './pages/AdministradorRoot/administradores/administradores.component';
import {InformacionNegocioComponent} from './pages/AdministradorRoot/informacion-negocio/informacion-negocio.component';
import {InformacionComponent} from './pages/administrador/informacion/informacion.component';
import {MenuComponent} from './pages/administrador/menu/menu.component';
import {ReservacionComponent} from './pages/administrador/reservacion/reservacion.component';
import {ComentarioComponent} from './pages/administrador/comentario/comentario.component';
import {EventoComponent} from './pages/administrador/evento/evento.component';
import {MensajesComponent} from './pages/administrador/mensajes/mensajes.component';
import {HorariosComponent} from './pages/administrador/horarios/horarios.component';
import {FotosComponent} from './pages/administrador/fotos/fotos.component';
import {RegistarMenuComponent} from './pages/administrador/registar-menu/registar-menu.component';
import {FormEventoComponent} from './pages/administrador/form-evento/form-evento.component';
import {AuthGuard} from './guards/auth.guard';
import {Error404Component} from './error-pages/error404/error404.component';
import {Error500Component} from './error-pages/error500/error500.component';
import {LoginGuard} from './guards/login.guard';
import {ComplementosComponent} from './pages/AdministradorRoot/complementos/complementos.component';
import {UsuarioComponent} from './pages/administrador/usuario/usuario.component';
import {VerficarCodigoComponent} from './pages/verficar-codigo/verficar-codigo.component';
import {CambioPasswordComponent} from './pages/cambio-password/cambio-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', data: { role: 'admin' } },
  { path: '404', component: Error404Component },
  { path: '505', component: Error500Component },
  { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'verificar', component: VerficarCodigoComponent },
  { path: 'cambioPassword', component: CambioPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'informacion', component: InformacionComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'horarios', component: HorariosComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'fotos', component: FotosComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'usuario/informacion', component: UsuarioComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'menu', component: MenuComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'menu/registrar', component: RegistarMenuComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'menu/registrar/:id', component: RegistarMenuComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'reservacion', component: ReservacionComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'comentarios', component: ComentarioComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'eventos', component: EventoComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'eventos/registrar', component: FormEventoComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'eventos/editar/:id', component: FormEventoComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'mensajes', component: MensajesComponent, canActivate: [ AuthGuard ], data: { role: 'admin' } },
  { path: 'administrador/negocios',
    component: NegociosComponent,
    canActivate: [ AuthGuard ], data: { role: 'root' } },
  { path: 'administrador/registrarnegocio', component: RegistrarNegocioComponent, canActivate: [ AuthGuard ], data: { role: 'root' } },
  { path: 'administrador/administradores', component: AdministradoresComponent, canActivate: [ AuthGuard ], data: { role: 'root' } },
  { path: 'administrador/negocio/informacion/:id', component: InformacionNegocioComponent, canActivate: [AuthGuard], data: { role: 'root' } },
  { path: 'administrador/complementos', component: ComplementosComponent, canActivate: [AuthGuard], data: { role: 'root' } },
  //{ path: 'dashboard', component: DashboardComponent },
  //{ path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  //{ path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  //{ path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  //{ path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  //{ path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  //{ path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  //{ path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  //{ path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  //{ path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
