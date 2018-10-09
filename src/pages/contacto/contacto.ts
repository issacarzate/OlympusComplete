import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';

//Proveedores
import {ContactoProvider} from "../../providers/contacto/contacto";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";

//Native
import {CallNumber} from "@ionic-native/call-number";

@IonicPage()
@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class ContactoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private actionSheetCtrl:ActionSheetController,
              private callNumber: CallNumber,
              private  iab: InAppBrowser,
              private _contactoProvider:ContactoProvider,
              private DKP: DeviceKeyProvider) {
  }

  //Si no hay token obtiene token antes de pedir contactos
  ionViewWillEnter(){
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

  //Obitene los contactos
  ionViewDidLoad(){
    this._contactoProvider.getContactosData();
  }

  //Revisa si cambio el idioma para perdir contactos de nuevo
  ionViewDidEnter(){
    if(this.DKP.chaeckLan())this._contactoProvider.getContactosData();
  }

  //Permite lanzar llamada con el numero recibido y escoger entre nacional e internacional
  llamada(intPhone:string, domPhone:string){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Give Us A Call',
      buttons: [
        {
          text: 'Local',
          handler: () => {
            this.callNumber.callNumber(domPhone, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        },
        {
          text: 'International',
          handler: () => {
            this.callNumber.callNumber(intPhone, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
    //En caso de llamar solo al numero internacional
    /*
    this.callNumber.callNumber(numeroLlamada, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    console.log('Archive clicked');
    */
  }

  //Permite mandar whatsapp con mensaje y numero recibido recibido via ws
  whatsapp(whatsNumero:string, whatsMensaje:string){
        const options: InAppBrowserOptions = {
          zoom: 'no'
        };
        this.iab.create('https://api.whatsapp.com/send?phone=' + whatsNumero + '&text=' + whatsMensaje, '_self', options);
    }
}
