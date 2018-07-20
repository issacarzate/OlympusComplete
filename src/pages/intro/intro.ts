import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";


/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  slides:any[] = [
    {
      title: "Bienvenido!!!",
      description: "Esta <b>aplicación</b> hará tu viaje mucho más fácil!",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "¿Qué hace por ti?",
      description: "<b>Olympus Tours</b> quiere que tu viaje sea mas placentero",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "¿Que hace esta app?",
      description: "Esta aplicación nos ayudará a conocer más sobre el ciclo de tu viaje de inicio a fin",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  console.log('ionViewDidLoad IntroPage');
}
navHome() {
  this.navCtrl.setRoot(TabsPage);
}


}
