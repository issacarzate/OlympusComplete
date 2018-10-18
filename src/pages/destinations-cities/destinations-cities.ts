import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {DestinationsInfoPage} from "../destinations-info/destinations-info";

//Providers
import {ToursProvider} from "../../providers/tours/tours";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";

@IonicPage()
@Component({
  selector: 'page-destinations-cities',
  templateUrl: 'destinations-cities.html',
})
export class DestinationsCitiesPage {
  verificacionFormulario:string;
  private loading: any;

  constructor(public navCtrl: NavController,
              private _toursProvider:ToursProvider,
              private DKP: DeviceKeyProvider,
              public loadingCtrl: LoadingController) {
  }

  //Obitene los paises y ajusta el idioma del loading controller
  ionViewDidLoad(){
    if(this.DKP.keys.lang==1){
      this.verificacionFormulario = 'Verificando Información...';
    }else{
      //Mensajes en ingles
      this.verificacionFormulario = 'Verifing info...';
    }
  }

  //Se sabe que si el usuario llego aqui ya se tiene token por lo que no hay verificacion. Se piden los destinos del pais que recibio el proveedor.
  elegirCiudad(cityId:string){
    this.loading = this.loadingCtrl.create({
      content: this.verificacionFormulario
    });
    this.loading.present().then();
    this._toursProvider.getToursData(cityId).then(
      response => {
        this.loading.dismissAll();
        this.navCtrl.push(DestinationsInfoPage);
      }
    );
  }

}
