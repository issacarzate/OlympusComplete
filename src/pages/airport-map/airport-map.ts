import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-airport-map',
  templateUrl: 'airport-map.html',
})
export class AirportMapPage {

  mapSrc:string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

//Se obtiene el parametro de la pagina anterior para mostrar el mapa
    if (this.navParams.get('mapPath')) {
      console.log(this.navParams.get('mapPath'));
      this.mapSrc = this.navParams.get('mapPath');
    }
  }

}
