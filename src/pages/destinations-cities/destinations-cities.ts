import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DestinationsInfoPage} from "../destinations-info/destinations-info";
import {ToursProvider} from "../../providers/tours/tours";

/**
 * Generated class for the DestinationsCitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-destinations-cities',
  templateUrl: 'destinations-cities.html',
})
export class DestinationsCitiesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _toursProvider:ToursProvider) {
  }

  elegirCiudad(cityId:string){
    this._toursProvider.getToursData(cityId);
    this.navCtrl.push(DestinationsInfoPage);
  }
}
