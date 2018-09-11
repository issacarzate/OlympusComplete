import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {HTTP} from "@ionic-native/http";
import {Platform} from "ionic-angular";
import {DeviceKeyProvider} from "../device-key/device-key";


@Injectable()
export class ItinerarioProvider {
  Itinerary : itinerary;
  userBooking:userRegister;

  constructor(public httpclient: HttpClient,
              private plt: Platform,
              private http: HTTP,
              private DKP: DeviceKeyProvider) {
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  addUserBookingService(usrBooking:userRegister){
    this.userBooking = usrBooking;
  }

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

export interface itinerary{
  booking:string;
  reservation:string;
  adults:string;
  children:string;
  arrival_date:string;
  arrival_flight:string;
  departure_date:string;
  departure_flight:string;
}

export interface userRegister{
  fullname:string,
  destination:string,
  bookingnumber:string
}
