import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthApiServices} from '../services/auth.services';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private authpaiservices: AuthApiServices, private router: Router ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authpaiservices.hasToken()) {
      this.authpaiservices.checkAuth().subscribe( (resp: any) => {
        if (resp.role.role == 'admin') {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          this.router.navigate(['/administrador/negocios']);
          return false;
        }
      });
    }
    return true;
  }
}
