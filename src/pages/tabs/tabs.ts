import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ItinerarioRegistroPage} from "../itinerario-registro/itinerario-registro";
import {PromocionesLoginPage} from "../promociones-login/promociones-login";
import { IntroPage } from '../intro/intro';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';
import {DestinationsPage} from "../destinations/destinations";
import {GlobalLanguagesPage} from "../global-languages/global-languages";
//import {ItineraryPage} from "../itinerary/itinerary";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  intinerario = ItinerarioRegistroPage ;
  tours = HomePage;
  promociones = PromocionesLoginPage;
  destinos = DestinationsPage;
  lenguajes = GlobalLanguagesPage;

  color: string = "primary";

  constructor(public navCtrl: NavController, public storage: Storage) {

  }
  ionViewDidLoad() {
  this.storage.get('intro-done').then(done => {
    if (!done) {
      this.storage.set('intro-done', true);
      this.navCtrl.setRoot(IntroPage);
      }
   });
  }
  selectInformation(){
    this.color = "secondary";
  }

  selectContact(){
    this.color = "danger";
  }
}
