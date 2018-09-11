import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
//Cordova
import { HTTP } from '@ionic-native/http';
import {Platform} from "ionic-angular";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {DeviceKeyProvider} from "../device-key/device-key";


/*
  Generated class for the DestinationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DestinationsProvider {

  countriesCollection: AngularFirestoreCollection<Country>;
  citiesCollection: AngularFirestoreCollection<City>;
  toursCollection: AngularFirestoreCollection<Tour>;

  HighlightedTours : HighlightedToursRest[] = [];
  MostVisitedTours : MostVisitedToursRest[] = [];

  DT:string = this.DKP.keys.devicetoken;
  DL:number = this.DKP.keys.lang;
  ApiKey:string = this.DKP.keys.apikey;


  constructor(private httpclient:HttpClient,
              private http: HTTP,
              private plt: Platform,
              private DKP: DeviceKeyProvider,
              private afs:AngularFirestore) {

    this.countriesCollection = this.afs.collection('countriesColleciton');

    //this.country = this.countriesCollection.valueChanges();

    //FireDb.settings({ timestampsInSnapshots: true });
    /*
    db.collection('countriesColleciton').add({
      name: 'Suecia',
      image: 'assets/tours/card-amsterdam.png',
      cities:['Cancun', 'Playa del Camren', 'Los Cabos']
    }).then((data)=>{
      console.log(data);
    }).catch((error)=>{
      console.log(error);
    });*/
  }

  getCountry(index:number){
    //return this.country[index];
  }
  getDbCities(coutryName:string){
    this.citiesCollection = this.afs.collection('Cities', ref => ref.where('country', '==', coutryName));

    // this.countriesCollection = this.afs.collection('countriesColleciton'); //Referencia
    // this.countries = this.countriesCollection.valueChanges(); //Observable de los datos
    //return this.countries
  }
  getDbTours(coutryName:string) {
    this.toursCollection = this.afs.collection('Tours', ref => ref.where('city', '==', coutryName));
  }

  getHighlightedToursData() {
    if(this.plt.is('cordova')) {
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/tours/highlighted',
        {lang:this.DKP.keys.lang.toString(), token: this.DKP.keys.devicetoken},
        {'x-api-key': this.DKP.keys.apikey,
        'content-type': 'application/json'})
        .then(data => {
          //this.HighlightedTours.map( data.data.tours);
          this.HighlightedTours = JSON.parse(data.data)['tours'];
         // data.data['tours'].map(this.HighlightedTours);
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

          console.log("Estos son los highlighted tours " + JSON.stringify(this.HighlightedTours));

          //console.log(data.data);

        })
        .catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key':this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/tours/highlighted?lang=' + this.DKP.keys.lang.toString() + '&token=' +  this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.HighlightedTours = res['tours'];
              console.log(this.HighlightedTours);
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

  getMostVisitedToursData() {
    if(this.plt.is('cordova')) {
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/tours/mostvisited',
        {lang:this.DKP.keys.lang.toString(), token: this.DKP.keys.devicetoken},
        {'x-api-key': this.DKP.keys.apikey,
          'content-type': 'application/json'})
        .then(data => {
          this.MostVisitedTours = JSON.parse(data.data)['tours'];
          // data.data['tours'].map(this.HighlightedTours);
          console.log("Estos son los mas visitados tours " + JSON.stringify(this.MostVisitedTours));
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

        })
        .catch(error => {
          console.log("Estos son los mas visitados tours " + this.MostVisitedTours);
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/tours/mostvisited?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.MostVisitedTours = res['tours'];
              console.log(this.MostVisitedTours);
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

export interface HighlightedToursRest{
  id: string;
  imageUrl: string;
  name: string;
}

export interface MostVisitedToursRest{
  image: string;
  destination: string;
  name: string;
  url: string;
}

export interface Country{
  cities:string[];
  image:string;
  name:string;
  id?: string;
}
export interface City{
  cities:string[];
  country:string;
  images:string[];
  id?: string;
}
export interface Tour{
  city:string;
  title:string,
  buyLink:string;
  content:string;
  videoId:string;
  image:string;
  id?: string;
}
export interface Offer{
  imageLink:string,
  title:string,
  subtitle:string,
  content:string,
  link:string
}

