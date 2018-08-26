import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToursProvider } from "../../providers/tours/tours";
import { DestinationsCitiesPage } from "../destinations-cities/destinations-cities";
import { ContactoPage } from "../contacto/contacto";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _toursProvider:ToursProvider) {
    this._toursProvider.getCountriesData();
    //this.countries = this._destinationsProvider.countriesCollection.valueChanges();
  }

  elegirPais(countryId:string){
    this._toursProvider.getDestinationsData(countryId);
    this.navCtrl.push(DestinationsCitiesPage);
  }
  contactar(){
    this.navCtrl.push(ContactoPage);
  }

}
