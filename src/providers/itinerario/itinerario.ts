import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";

//Providers
import {DeviceKeyProvider} from "../device-key/device-key";

//Native
import {HTTP} from "@ionic-native/http";

@Injectable()
export class ItinerarioProvider {
  Itinerary : ItineraryRest;
  userBooking:UserRegisterForm;

  constructor(public httpclient: HttpClient,
              //Se detecta plataforma
              private plt: Platform,
              //Peticiones nativas para puerto permitido
              private http: HTTP,
              private DKP: DeviceKeyProvider) {

    //Validamos si ya tenemos token, en caso de que no, se vuelve a pedir
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  //Servicio para obtener los daos ingresados para mandarlos a traves del ws
  addUserBookingService(usrBooking:UserRegisterForm){
    this.userBooking = usrBooking;
  }

  //Se obtienen los datos del usuarios, si es que existen desde olympus tours. Regresa una promesa.
  getItineraryData(name:string, booking:string, destination:string) {
    console.log("Este es el device token " + this.DKP.keys.devicetoken);
    if(this.plt.is('cordova')){
      let promise = new Promise((resolve, reject) => {
        this.http.get('http://rest.viajesolympus.com/api/v1/travelers?lang=' +
          this.DKP.keys.lang.toString() + '&token=' +
          this.DKP.keys.devicetoken +
          '&name=' + name +
          '&booking=' + booking +
          '&destination=' + destination,
          {},
          {
            'x-api-key': this.DKP.keys.apikey,
            'Content-Type': 'application/json'
          })
          .then(data => {
              this.Itinerary = JSON.parse(data.data)['itinerary'];
              this.Itinerary.destination = destination;
              resolve();
            },
            msg => {
              reject(msg);
            }).catch(error => {
          console.log(error.data); // error message as string
        });
      });
      return promise;
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });

      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/travelers?lang=' +
          this.DKP.keys.lang.toString() + '&token=' +
          this.DKP.keys.devicetoken +
          '&name=' + name +
          '&booking='+ booking +
          '&destination=' + destination;
        this.httpclient.get(apiURL,  {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.Itinerary = res['itinerary'];
              this.Itinerary.destination = destination;
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

//Interfaz para el manejo de todos los datos del itinerario recibido
export interface ItineraryRest{
  booking:string;
  reservation:string;
  adults:string;
  children:string;
  arrival_date:string;
  arrival_flight:string;
  departure_date:string;
  departure_flight:string;
  arrival_date_numeric: number;
  departure_date_numeric: number;
  destination:string;
}

//Interfaz para manejo de datos de la forma
export interface UserRegisterForm{
  fullname:string,
  destination:string,
  bookingnumber:string
}
