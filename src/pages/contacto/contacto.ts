import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CallNumber} from "@ionic-native/call-number";
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';
import {ContactoProvider} from "../../providers/contacto/contacto";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";
import {ItinerarioProvider} from "../../providers/itinerario/itinerario";

/**
 * Generated class for the ContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class ContactoPage {
  numeros:any[] = [
    {
      bandera: "🇵🇹",
      nombre: "Cancun Central",
      numero: "5566778899",
      whatsapp: "5219982314488"
    },
    {
      bandera: "🇵🇷",
      nombre: "San Juan",
      numero: "55881122",
      whatsapp: "5219982314488"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private callNumber: CallNumber,
              private  iab: InAppBrowser,
              private _contactoProvider:ContactoProvider,
              private DKP: DeviceKeyProvider,
              private _itineraryProvider: ItinerarioProvider) {
   // this._contactoProvider.getContactosData().catch((err:any) => console.log(err.toString()));;
  }

  ionViewWillEnter(){
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  ionViewDidLoad(){
    this._contactoProvider.getContactosData();
  }

  ionViewDidEnter(){
    if(this.DKP.chaeckLan())this._contactoProvider.getContactosData();
  }

  llamada(numeroLlamada:string){
    this.callNumber.callNumber(numeroLlamada, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    console.log('Archive clicked');
  }

  whatsapp(whatsNumero:string){
        const options: InAppBrowserOptions = {
          zoom: 'no'
        };
        this.iab.create('https://api.whatsapp.com/send?phone='+whatsNumero+'&text=Necesito informes', '_self', options);
    }
}
