import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService:LoginService, private router:Router, private snackBar: MatSnackBar){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginService.logueado){
        this.router.navigate(['login']);
        this.snackBar.open('Inicia Sesión!','',{
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      }
    return this.loginService.logueado;
  }
  
}
