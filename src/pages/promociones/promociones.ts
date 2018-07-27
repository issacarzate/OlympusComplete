import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Offer} from "../../providers/destinations/destinations";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {AngularFireAuth} from "angularfire2/auth";
import {PromocionesLoginPage} from "../promociones-login/promociones-login";

/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {
  offers:Offer[] = [
    {
      imageLink:"https://imagesmx-olympustours1.netdna-ssl.com/thumbnail.php?url=L2dhbGVyaWEvUFVOVEFDQU5BLVNXSU1XRE9MUEhJTlMxLTc3MFg0MDAuanBn&size=395x205",
      title: "Sunset Cruise",
      subtitle: "Los Cabos, Mexico",
      content: "Discover the beauty of the Marietas Islands sailing from Nuevo Vallarta´s Marina. The Marietas Islands is a unique eco system with a huge diversity of tropical wildlife. ",
      link: "https://www.olympus-tours.com/tours/puerto-vallarta/marieta-island-boat"
    },
    {
      imageLink:"https://imagesmx-olympustours1.netdna-ssl.com/thumbnail.php?url=L2dhbGVyaWEvTWFyaW5hcml1bTUuanBn&size=395x205",
      title: "Marinarium Snorkeling",
      subtitle: "La Romana",
      content: "Marinarium invites you to discover the wonders of the reef and the marine life." ,
      link: "https://www.olympus-tours.com/tours/la-romana/marinarium-snorkeling-romana"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private iab: InAppBrowser,
              private afAuth: AngularFireAuth) {
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
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(PromocionesLoginPage);
  }

}
