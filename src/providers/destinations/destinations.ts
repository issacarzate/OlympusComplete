//import { HttpClient } from '@angular/common/http';
//public http: HttpClient
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

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


  constructor(private afs:AngularFirestore) {

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
