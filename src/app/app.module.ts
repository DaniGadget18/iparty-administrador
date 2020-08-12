// importaciones importantes
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
// Componentes purpule
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';

// Modulo firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Componentes  iParty
import { LoginComponent } from './pages/login/login.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { DashboardComponent  } from './pages/administrador/dashboard/dashboard.component';

// Servicios iParty
import {ApiServices} from './services/api.services';
import { NegociosComponent } from './pages/AdministradorRoot/negocios/negocios.component';
import { RegistrarNegocioComponent } from './pages/AdministradorRoot/registrar-negocio/registrar-negocio.component';
import { AdministradoresComponent } from './pages/AdministradorRoot/administradores/administradores.component';
import { InformacionNegocioComponent } from './pages/AdministradorRoot/informacion-negocio/informacion-negocio.component';
import { InformacionComponent } from './pages/administrador/informacion/informacion.component';
import { MenuComponent } from './pages/administrador/menu/menu.component';
import { ReservacionComponent } from './pages/administrador/reservacion/reservacion.component';
import { ComentarioComponent } from './pages/administrador/comentario/comentario.component';
import { EventoComponent } from './pages/administrador/evento/evento.component';
import { MensajesComponent } from './pages/administrador/mensajes/mensajes.component';
import { HorariosComponent } from './pages/administrador/horarios/horarios.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {environment} from '../environments/environment';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { FotosComponent } from './pages/administrador/fotos/fotos.component';
import {ApiFotosServices} from './services/fotos-api.services';
import {AuthApiServices} from './services/auth.services';
import {ApiRootServices} from './services/api-Root.services';
import { RegistarMenuComponent } from './pages/administrador/registar-menu/registar-menu.component';
import {ChatService} from './services/chat.services';
import { FormEventoComponent } from './pages/administrador/form-evento/form-evento.component';
import {Error500Component} from './error-pages/error500/error500.component';
import {Error404Component} from './error-pages/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    LoginComponent,
    ForgetpasswordComponent,
    NegociosComponent,
    RegistrarNegocioComponent,
    AdministradoresComponent,
    InformacionNegocioComponent,
    InformacionComponent,
    MenuComponent,
    ReservacionComponent,
    ComentarioComponent,
    EventoComponent,
    MensajesComponent,
    HorariosComponent,
    NgDropFilesDirective,
    FotosComponent,
    RegistarMenuComponent,
    FormEventoComponent,
    Error500Component,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZZp-RshwuzaO_hECe_yjt3rxc_wrgOYE'
    })
  ],
  providers: [
    ApiServices,
    ApiFotosServices,
    AuthApiServices,
    ApiRootServices,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
