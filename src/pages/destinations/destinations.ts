import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DestinationsCitiesPage } from "../destinations-cities/destinations-cities";
import { ContactoPage } from "../contacto/contacto";

//Providers
import {DeviceKeyProvider} from "../../providers/device-key/device-key";
import { ToursProvider } from "../../providers/tours/tours";

@IonicPage()
@Component({
  selector: 'page-destinations',
  templateUrl: 'destinations.html',
})
export class DestinationsPage {

  constructor(public navCtrl: NavController,
              private _toursProvider:ToursProvider,
              private DKP: DeviceKeyProvider) {

  }

  //Si no hay token obtiene token antes de pedir paises
  ionViewWillEnter(){
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  //Obitene los paises
  ionViewDidLoad(){
    this._toursProvider.getCountriesData();
  }

  //Revisa si cambio el idioma para perdir paises de nuevo
  ionViewDidEnter(){
    if(this.DKP.chaeckLan())this._toursProvider.getCountriesData();
  }

  //Manda el pais para pedir sus destinos en la siguiente pagina mediante el mismo proveedor
  elegirPais(countryId:string){
    this._toursProvider.getDestinationsData(countryId);
    this.navCtrl.push(DestinationsCitiesPage);
  }

  //Pemrite meter al stack la pagina de contacto
  contactar(){
    this.navCtrl.push(ContactoPage);
  }

}
