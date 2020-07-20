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


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'administrador/negocios', component: NegociosComponent },
  { path: 'administrador/registrarnegocio', component: RegistrarNegocioComponent },
  { path: 'administrador/administradores', component: AdministradoresComponent },
  { path: 'administrador/negocio/informacion', component: InformacionNegocioComponent },
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
