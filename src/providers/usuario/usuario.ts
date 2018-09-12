import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HTTP} from "@ionic-native/http";
import {Platform} from "ionic-angular";
import {DeviceKeyProvider} from "../device-key/device-key";

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  usuario: Credenciales = {
    name : "issac",
    email : "issac@gmail.com",
    gender: true,
    deviceId: "dfsdf",
    snId: "hgjhg",
    nickname: "perci",
    country: 1,
    city: "CDMX",
    state: "BJ",
    age: 28,
    birthdate: "23-233-23",
    deviceDescription: "232fsf",
  };

  constructor(private httpclient:HttpClient,
              private http: HTTP,
              private DKP: DeviceKeyProvider,
              private plt: Platform) {}

  /*
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
    this.postfUser(this.usuario);

  */

  cargarUsuario(nombre: string,
                email: string,
                snId: string){
    this.usuario.name=nombre;
    this.usuario.email=email;
    this.usuario.snId=snId;
    console.log("Este usuario mandare.... " +  JSON.stringify(this.usuario));
    this.postfUser(this.usuario);
  }

  postfUser(usuario:Credenciales) {
    //Petición para android e ios
    if(this.plt.is('cordova')) {
      let promise = new Promise((resolve, reject) => {
        this.http.setDataSerializer('json');
        this.http.post('http://rest.viajesolympus.com/api/v1/travelers',
          {
            appId: '1212',
            token: this.DKP.keys.devicetoken,
            lang: this.DKP.keys.lang.toString(),
            name : usuario.name,
            email : usuario.email,
            gender: true,
            deviceId: usuario.deviceId,
            snId: usuario.snId,
            nickname: usuario.nickname,
            country: usuario.country,
            city: usuario.city,
            state: usuario.state,
            age: usuario.age,
            birthdate: usuario.birthdate,
            deviceDescription: usuario.deviceDescription
          },
          {'x-api-key': this.DKP.keys.apikey, "Content-Type": "application/json"})
          .then(data => {
            console.log("Ya envie algo...Esperare respuesta");
            console.log(data);
              //this.keys.devicetoken = JSON.parse(data.data)['token'];
              resolve();
            },
            msg => {
              reject(msg);
            }).catch(error => {
          let json = JSON.parse(error.error);
          console.log(json);
        });
      });
      return promise;
    }else {
      //Petición para navegadores (con fines de testing)
      let hdrs = new HttpHeaders({
        'x-api-key': this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/travelers';
        this.httpclient.post(apiURL, {
          idApp: '1212',
          lang:this.DKP.keys.lang.toString(),
          appId: '1212',
          token: this.DKP.keys.devicetoken,
          name : usuario.name,
          email : usuario.email,
          gender: true,
          deviceId: usuario.deviceId,
          snId: usuario.snId,
          nickname: usuario.nickname,
          country: usuario.country,
          city: usuario.city,
          state: usuario.state,
          age: usuario.age,
          birthdate: usuario.birthdate,
          deviceDescription: usuario.deviceDescription
        }, {headers: hdrs},)
          .toPromise()
          .then(
            res => { // Success
              console.log("Ya envie algo...Esperare respuesta");
              console.log(res);
              resolve();
            },
            msg => { // Error
              reject(msg);
            }
          ).catch(this.handleError);
      });
      return promise;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}

export interface Credenciales {
  name?: string;
  email?: string;
  gender?: boolean;
  deviceId?: string;
  snId?: string;
  nickname?: string;
  country?: number;
  city?: string;
  state?: string;
  age?: number;
  birthdate?: string;
  deviceDescription?: string;
}
/*
export interface Credenciales {
  nombre?: string;
   email?: string;
   imagen?: string;
   uid?: string;
   provider?: string;
}
*/
