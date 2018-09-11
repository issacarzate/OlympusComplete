//Angular Providers
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";
import {TranslateService} from "ng2-translate";

//Own Providers
import {availableLanguages, defaultLanguage} from "../../pages/global-languages/global-languages.constants";

//Cordova Providers
import {HTTP} from "@ionic-native/http";
import { Globalization } from '@ionic-native/globalization';

@Injectable()
export class DeviceKeyProvider {
  //Variable de tipo FormData para ser usada en loa parámetros de las peticiones
  postData = new FormData();

  //Variable usada para poder hacer las peticiones con todos lo parametros
  //y header adecuado a todos los servicios
   keys:DeviceKeyTokenLan = {
    apikey: "1234",
    devicetoken: "",
    lang:1
  };

   lastLang:number;

  constructor(private httpclient:HttpClient,
              private http: HTTP,
              private plt: Platform,
              private globalization: Globalization,
              translate: TranslateService) {

  //Obtenemos el idioma del dispositivo (ios, android) para guardarlo en nuestra variable keys
    if(this.plt.is('cordova')){
    this.globalization.getPreferredLanguage()
      .then(res => {
        console.log("Este es valor del idioma "+res.value);
        var language = this.getSuitableLanguage(res.value);
        if(language=="es"){this.keys.lang = 1;
          this.lastLang=1;}
        if(language=="en"){this.keys.lang = 2;
          this.lastLang=2}
      })
      .catch(e => console.log(e));
    }else{
  //Obtenemos el idioma del navegador para guardarlo en nuestra variable keys
      let browserLanguage = translate.getBrowserLang() || defaultLanguage;
      var language = this.getSuitableLanguage(browserLanguage);
      if (language == 'es'){
        this.keys.lang = 1;
      }
      if (language == 'en'){
        this.keys.lang = 2;
      }
    }
  }

  //Constructor para la petición del token único para el dispositivo
   getDeviceApiKey() {
  //Petición para android e ios
    if(this.plt.is('cordova')) {
      let promise = new Promise((resolve, reject) => {
        this.http.setDataSerializer('json');
        this.http.post('http://rest.viajesolympus.com/api/v1/auth/keys',
          {idApp: '1212', lang: this.keys.lang.toString()},
          {'x-api-key': this.keys.apikey, "Content-Type": "application/json"})
          .then(data => {
            this.keys.devicetoken = JSON.parse(data.data)['token'];
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
        'x-api-key': this.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/auth/keys';
        this.httpclient.post(apiURL, {idApp: '1212', lang:this.keys.lang.toString()}, {headers: hdrs},)
          .toPromise()
          .then(
            res => { // Success
              this.keys.devicetoken = res['token'];
              console.log(res);

              console.log("Estos es el token del dispositivo " + JSON.stringify(this.keys.devicetoken ));
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


  chaeckLan() : boolean{
    return this.keys.lang != this.lastLang;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private getSuitableLanguage(language) {
    language = language.substring(0, 2).toLowerCase();
    return availableLanguages.some(x => x.code == language) ? language : defaultLanguage;
  }


}

export interface DeviceKeyTokenLan{
  apikey: string,
  devicetoken: string
  lang:number
}
