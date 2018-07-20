import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {City, DestinationsProvider} from "../../providers/destinations/destinations";
import {Observable} from "rxjs/Observable";
import {DestinationsInfoPage} from "../destinations-info/destinations-info";

/**
 * Generated class for the DestinationsCitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-destinations-cities',
  templateUrl: 'destinations-cities.html',
})
export class DestinationsCitiesPage {
  cities: Observable<City[]>;
  imagesDevice:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _destinationsProvider:DestinationsProvider) {
    this.cities = this._destinationsProvider.citiesCollection.valueChanges();
  }

  ionViewDidLoad() {
    console.log(this.cities.forEach(images => console.log('hola')))
  }
  elegirCiudad(cityName:string){
    this._destinationsProvider.getDbTours(cityName);
    this.navCtrl.push(DestinationsInfoPage);
  }
}
