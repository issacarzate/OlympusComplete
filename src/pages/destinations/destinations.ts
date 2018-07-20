import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DestinationsProvider, Country } from "../../providers/destinations/destinations";
import {DestinationsCitiesPage} from "../destinations-cities/destinations-cities";
import {Observable} from "rxjs/Observable";
import {ContactoPage} from "../contacto/contacto";

/**
 * Generated class for the DestinationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-destinations',
  templateUrl: 'destinations.html',
})
export class DestinationsPage {
  //countries: Observable<Country[]>;
  countries: Observable<Country[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _destinationsProvider:DestinationsProvider) {
    this.countries = this._destinationsProvider.countriesCollection.valueChanges();
  }

  ionViewDidLoad() {
    console.log(this.countries);
  }

  elegirPais(countryName:string){
    this._destinationsProvider.getDbCities(countryName);
    this.navCtrl.push(DestinationsCitiesPage);
  }
  contactar(){
    this.navCtrl.push(ContactoPage);
  }

}
