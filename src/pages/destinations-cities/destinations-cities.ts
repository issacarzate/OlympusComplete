import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {DestinationsInfoPage} from "../destinations-info/destinations-info";

//Providers
import {ToursProvider} from "../../providers/tours/tours";

@IonicPage()
@Component({
  selector: 'page-destinations-cities',
  templateUrl: 'destinations-cities.html',
})
export class DestinationsCitiesPage {

  constructor(public navCtrl: NavController,
              private _toursProvider:ToursProvider) {
  }

  //Se sabe que si el usuario llego aqui ya se tiene token por lo que no hay verificacion. Se piden los destinos del pais que recibio el proveedor.
  elegirCiudad(cityId:string){
    this._toursProvider.getToursData(cityId);
    this.navCtrl.push(DestinationsInfoPage);
  }

}
