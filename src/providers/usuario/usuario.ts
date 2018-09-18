import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Platform} from "ionic-angular";

//Providers
import {DeviceKeyProvider} from "../device-key/device-key";

//Native
import {HTTP} from "@ionic-native/http";
import {Firebase} from "@ionic-native/firebase";


@Injectable()
export class UsuarioProvider {

  //Datos de prueba junto con datos reales
  usuario: Credenciales = {
    name : "issac",
    email : "issac@gmail.com",
    gender: true,
    deviceId: "dfsdf",
    snId: "",
    nickname: "perci",
    country: 1,
    city: "CDMX",
    state: "BJ",
    age: 28,
    birthdate: "23-233-23",
    deviceDescription: "232fsf",
  };

  constructor(private httpclient:HttpClient,
              public firebaseNative: Firebase,
              //Manejamos peticiones desde puerto nativo admitido
              private http: HTTP,
              private DKP: DeviceKeyProvider,
              //Detectamos plataforma
              private plt: Platform) {}

//Anadimos la informacion del usuario y lo mandamos
  async cargarUsuario(nombre: string,
                email: string,
                snId: string){
    this.usuario.name=nombre;
    this.usuario.email=email;
    this.usuario.snId=snId;
    //Obtenemos el token para las notificaciones
    this.usuario.deviceId = await this.firebaseNative.getToken();
    console.log("Este es el token " + this.usuario.deviceId);
    this.postfUser(this.usuario);
  }

  //Funcion para mandar usuario a olympustours, se hace el mapeo de datos de forma manual. Regresa promesa.
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

  //Manejamos errores
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}

//Interfaz de los adatos a enviar a facebook
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
