import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthApiServices} from '../services/auth.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  intro: HTMLElement;
  wrapper: HTMLElement;

  constructor( private auth: AuthApiServices, private router: Router ) {
  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(route);
  }

  check(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.isAutenticado()) {
      this.auth.checkAuth().subscribe( (resp: any) => {
        if (resp.role.role !== route.data.role) {
          if (resp.role.role === 'admin') {
            this.router.navigate(['/dashboard']);
            return false;
          } else if (resp.role.role === 'root') {
            this.router.navigate(['/administrador/negocios']);
            return false;
          }
        }
      }, (error) => {
        console.log(error);
      });
      return true;
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('expira');
      this.auth.tokenValid = 'Expiro el token, vuelve a iniciar sesion';
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
