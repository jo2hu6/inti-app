import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor( private loginService: LoginService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form = fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  ingresar(){
    
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if(usuario == 'admin' && password == 'admin'){
      //Redireccionamos al dashboard
      this.fakeLoading();
      this.loginService.logueado = true;
    }else{
      //Mostramos mensaje de error
      this.error();
      this.form.reset();
      this.loginService.logueado = false;
    }

  }

  error(){
    this._snackBar.open('Usuario y/o contraseña ingresados son inválidos','',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(()=>{
      this.router.navigate(['dashboard/inicio']);
    }, 1500);
  }

}
