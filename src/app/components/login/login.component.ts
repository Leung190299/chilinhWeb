import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/serve/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   formlogin!: FormGroup;
  constructor(private readonly fb:FormBuilder,private readonly loginserve: LoginService) { }

  ngOnInit(): void {
    this.formlogin=this.fb.group({
      username: new FormControl('',[Validators.email,Validators.required] ),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }
  login(){
    const{username,password}=this.formlogin.value
    this.loginserve.login(username,password);

  }
}
