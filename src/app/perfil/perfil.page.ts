import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  formPerfil : FormGroup;
  expresion = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";

  constructor( 
    private location : Location,
    private formBuilder : FormBuilder,
  ) {

   }

  ngOnInit() {
    this.formPerfil = this.formBuilder.group({
      'name' : ['', Validators.required],
      'email' : ['', Validators.required],
      'age' : ['', Validators.required],
    });
  }

  regresar() : void {
    this.location.back();
  }

  guardar() : void {
    console.log(this.formPerfil.value);
  }

}
