import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  usuario: Credenciales = {};

  constructor() {
    console.log('Hello UsuarioProvider Provider');
  }
  cargarUsuario(nombre: string,
                email: string,
                imagen: string,
                uid: string,
                provider: string){
    this.usuario.nombre=nombre;
    this.usuario.email=email;
    this.usuario.imagen=imagen;
    this.usuario.uid=uid;
    this.usuario.provider=provider;
    console.log(this.usuario);
  }

}

export interface Credenciales {
  nombre?: string;
   email?: string;
   imagen?: string;
   uid?: string;
   provider?: string;
}
