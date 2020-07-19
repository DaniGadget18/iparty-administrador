// importaciones importantes
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

// Componentes purpule
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent2 } from './dashboard/dashboard.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';

// Componentes  iParty
import { LoginComponent } from './pages/login/login.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { DashboardComponent  } from './pages/dashboard/dashboard.component';

// Servicios iParty
import {ApiServices} from './services/api.services';
import { NegociosComponent } from './pages/administrador/negocios/negocios.component';
import { RegistrarNegocioComponent } from './pages/administrador/registrar-negocio/registrar-negocio.component';
import { AdministradoresComponent } from './pages/administrador/administradores/administradores.component';

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
    AdministradoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [
    ApiServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
