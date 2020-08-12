import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthApiServices} from '../services/auth.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthApiServices, private router: Router ) {
  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(route);
  }

  check(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.isAutenticado()) {
      this.auth.checkAuth().subscribe( (resp: any) => {
        if (resp.role.role !== route.data.role) {
          console.log('si entro aqui');
          if (resp.role.role == 'admin') {
            this.router.navigate(['/dashboard']);
            return false;
          } else {
            this.router.navigate(['/administrador/negocios']);
            return false;
          }
        }
      });
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
