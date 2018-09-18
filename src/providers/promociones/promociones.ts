import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";

//Providers
import {DeviceKeyProvider} from "../device-key/device-key";

//Native
import {HTTP} from "@ionic-native/http";

@Injectable()
export class PromocionesProvider {
  //Se guardan aqui las promociones.
  PromocionesColl : PromocionesRest[] = [];
  ApiKey:string = this.DKP.keys.apikey;

  constructor(private httpclient: HttpClient,
              //Revisamos en que plataforma estamos
              private plt: Platform,
              //Maneajmos peticiones desde puerto nativo
              private http: HTTP,
              private DKP: DeviceKeyProvider) {
    //Revisamos si tenemos token, si no lo volvemos a pedir
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  //Obtenemos las promociones para android, iOS o Web.
  getPromocionesData() {
    console.log("Este es el device token " + this.DKP.keys.devicetoken);
    if(this.plt.is('cordova')){
      this.http.get('http://rest.viajesolympus.com/api/v1/promotions?lang=' +
        this.DKP.keys.lang.toString() + '&token=' +
        this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.DKP.keys.apikey,
          'Content-Type': 'application/json'})
        .then(data => {
          console.log(data);
          this.PromocionesColl = JSON.parse(data.data)['promotions'];
          console.log("Estas son las promociones " + JSON.stringify(this.PromocionesColl));
        })
        .catch(error => {
          console.log(error.status);
          console.log(error.data); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.ApiKey,
        'Content-Type': 'application/json'
      });

      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/promotions?lang=' +
          this.DKP.keys.lang.toString() + '&token=' +
          this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL,  {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.PromocionesColl = res['promotions'];
              console.log(this.PromocionesColl);
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

//Interfaz para manejo de datos de promociones.
export interface PromocionesRest {
  imageUrl: string;
  title: string;
  description: string;
  termsandconditions:string;
  button: string;
  url: string;
  cupon: string;
}
