//import { HttpClient } from '@angular/common/http';
//public http: HttpClient
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  userBooking:Booking;

  HighlightedTours : HighlightedToursRest[] = [];
  MostVisitedTours : MostVisitedToursRest[] = [];

  constructor(private afs:AngularFirestore,
              private httpclient:HttpClient) {

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

  addUserBookingService(usrBooking:Booking){
    this.userBooking = usrBooking;
  }

  getHighlightedToursData() {
    let hdrs = new HttpHeaders({ 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM', 'Content-Type':  'application/json' });
    let promise = new Promise((resolve, reject) => {
      let apiURL = window.location.origin + '/api/v1/tours/highlighted';
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

  getMostVisitedToursData() {
    let hdrs = new HttpHeaders({ 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM', 'Content-Type':  'application/json' });
    let promise = new Promise((resolve, reject) => {
      let apiURL = 'http://rest.viajesolympus.com/api/v1/tours/mostvisited';
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

export interface HighlightedToursRest{
  image: string;
  title: string;
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
export interface Booking{
  fullname:string,
  country:string[],
  bookingnumber:string
}
