import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {PromocionesLoginPage} from "../promociones-login/promociones-login";

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionesPage');
  }

  navigateToOffer(linkToOffer:string){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };

    //Abrir la url
    this.iab.create(linkToOffer, '_blank', options);
  }

  signOut() {
    this.navCtrl.setRoot(PromocionesLoginPage);
  }

}
