import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToursProvider } from "../../providers/tours/tours";
import { DestinationsCitiesPage } from "../destinations-cities/destinations-cities";
import { ContactoPage } from "../contacto/contacto";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";

@IonicPage()
@Component({
  selector: 'page-destinations',
  templateUrl: 'destinations.html',
})
export class DestinationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _toursProvider:ToursProvider,
              private DKP: DeviceKeyProvider) {

  }

  ionViewWillEnter(){
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  ionViewDidLoad(){
    this._toursProvider.getCountriesData();
  }

  ionViewDidEnter(){
    if(this.DKP.chaeckLan())this._toursProvider.getCountriesData();
  }

  elegirPais(countryId:string){
    this._toursProvider.getDestinationsData(countryId);
    this.navCtrl.push(DestinationsCitiesPage);
  }
  contactar(){
    this.navCtrl.push(ContactoPage);
  }

}
