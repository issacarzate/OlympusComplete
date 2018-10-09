import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ContactoPage} from "../contacto/contacto";

//Providers
import {DestinationsProvider} from "../../providers/destinations/destinations";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";

//Native
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              //Navegador nativo para abrir tours
              private iab: InAppBrowser,
              //Proveedor de servicios de tours
              private _destinationsProvider: DestinationsProvider,
              //Proveedor de servicios de token
              private DKP: DeviceKeyProvider,
              private storage: Storage) {

  }

//Si no hay token obtiene token antes de pedir tours
  ionViewDidLoad(){
    this.storage.get('lenguaje').then(done => {
      if (done) {
        if (this.DKP.keys.devicetoken == "") {
          this.DKP.getDeviceApiKey().then(response => {
            this._destinationsProvider.getHighlightedToursData();
            this._destinationsProvider.getMostVisitedToursData();
          });
        } else {
          this.DKP.obtenerIdioma();
          if (this.DKP.keys.devicetoken == "") {
            this.DKP.getDeviceApiKey().then(response => {
              this._destinationsProvider.getHighlightedToursData();
              this._destinationsProvider.getMostVisitedToursData();
            });
          }
        }
      }
      });
  }

  ionViewWillEnter(){
    this.storage.get('lenguaje').then(done => {
      if (done) {
        if (this.DKP.keys.devicetoken == "") {
          this.DKP.getDeviceApiKey().then(response => {
            this._destinationsProvider.getHighlightedToursData();
            this._destinationsProvider.getMostVisitedToursData();
          });
        } else {
          this.DKP.obtenerIdioma();
          if (this.DKP.keys.devicetoken == "") {
            this.DKP.getDeviceApiKey().then(response => {
              this._destinationsProvider.getHighlightedToursData();
              this._destinationsProvider.getMostVisitedToursData();
            });
          }
        }
      }
    });
  }


//Revisa si cambio el idioma para perdir tours de nuevo
  ionViewDidEnter(){
    if(this.DKP.chaeckLan()){
      this._destinationsProvider.getHighlightedToursData();
      this._destinationsProvider.getMostVisitedToursData();
    }
  }

  //Permite meter al stack la pagina de contacto y poder regresar a home
  contactar(){
    this.navCtrl.push(ContactoPage);
  }

//Permite abrir los enlaces del tour en el navegador interno
  abrirEnlace(enlace:string){
    //Opciones para abrir el link
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    //Abrir la url
    this.iab.create(enlace, '_blank', options);
  }
}
