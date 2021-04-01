import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../serve/login.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly loginServe:LoginService,
    private readonly route:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      if(this.loginServe.islogin()){

        return  of(true)
      }else{
        this.route.navigate(['/login'])
        return of(false)
      }


  }

}
