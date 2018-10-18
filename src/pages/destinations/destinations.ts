import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
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

  verificacionFormulario:string;
  private loading: any;


  constructor(public navCtrl: NavController,
              private _toursProvider:ToursProvider,
              private DKP: DeviceKeyProvider,
              public loadingCtrl: LoadingController) {

  }

  //Si no hay token obtiene token antes de pedir paises
  ionViewWillEnter(){
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  //Obitene los paises y ajusta el idioma del loading controller
  ionViewDidLoad(){
    if(this.DKP.keys.lang==1){
      this.verificacionFormulario = 'Verificando Información...';
      }else{
      //Mensajes en ingles
      this.verificacionFormulario = 'Verifing info...';
    }
    this._toursProvider.getCountriesData();
  }

  //Revisa si cambio el idioma para perdir paises de nuevo
  ionViewDidEnter(){
    this.loading = this.loadingCtrl.create({
      content: this.verificacionFormulario
    });
    this.loading.present().then();
    if(this.DKP.chaeckLan())this._toursProvider.getCountriesData().then(
      response => {
        this.loading.dismissAll();
      }
    );
  }

  //Manda el pais para pedir sus destinos en la siguiente pagina mediante el mismo proveedor
  elegirPais(countryId:string){
    this.loading = this.loadingCtrl.create({
      content: this.verificacionFormulario
    });
    this.loading.present().then();
    this._toursProvider.getDestinationsData(countryId).then(
      response => {
        this.loading.dismissAll();
        this.navCtrl.push(DestinationsCitiesPage);
      }
    );
  }

  //Pemrite meter al stack la pagina de contacto
  contactar(){
    this.navCtrl.push(ContactoPage);
  }

}
