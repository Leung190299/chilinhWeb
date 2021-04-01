import { Injectable } from '@angular/core';
import {AngularFireAuth}from '@angular/fire/auth'
import { Router } from '@angular/router';
import {  of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private readonly auth:AngularFireAuth,
    private readonly route:Router) { }

  login(eemail:string,pass:string){
    this.auth.signInWithEmailAndPassword(eemail,pass).then(()=>{
      localStorage.setItem('admin',eemail);
      this.route.navigate(['/restaurant'])
     return of(confirm('Đăng nhập thành công'));

    }).catch(e=>{
        return of( confirm('tài khoản mật khẩu k đúng'));
    })
  }
  islogin(){
    return localStorage.getItem('admin');

  }
}
