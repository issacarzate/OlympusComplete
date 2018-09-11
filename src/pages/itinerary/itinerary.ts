import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {AirportMapPage} from "../airport-map/airport-map";

//Native
import {AirportMapPage} from "../airport-map/airport-map";
import {ItinerarioProvider} from "../../providers/itinerario/itinerario";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";


/**
 * Generated class for the ItineraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html',
})

export class ItineraryPage {
  mapSrc:string = '';
  path:string='assets/maps/';
  mes:string;
  ida:string;
  regreso:string;

  journeyDate = new Date(this._itineraryProvider.Itinerary.arrival_date);
  leaveDate = new Date(this._itineraryProvider.Itinerary.departure_date)




  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _itineraryProvider: ItinerarioProvider,
              private DKP:DeviceKeyProvider) {
  }

  ionViewDidLoad() {
    var optionsMonth = {month: 'short'};
    var optionsDateEn = { day: 'numeric', month: 'long', year: 'numeric' };
    var optionsDateEs = { month: 'short', day: 'numeric', year: 'numeric' };
    if(this.DKP.keys.lang == 1) {
      this.mes = this.journeyDate.toLocaleDateString('es-ES', optionsMonth);
      this.ida = this.journeyDate.toLocaleDateString('es-ES', optionsDateEs)
      this.regreso = this.leaveDate.toLocaleDateString('es-ES', optionsDateEs)

    }
    if(this.DKP.keys.lang == 2) {
      this.mes = this.journeyDate.toLocaleDateString('en-US', optionsMonth);
      this.ida = this.journeyDate.toLocaleDateString('en-US', optionsDateEn)
      this.regreso = this.leaveDate.toLocaleDateString('en-US', optionsDateEn)

    }
    console.log(this.journeyDate);
    //console.log('Esta eeeees ' + this._userBookingService.userBooking.country['description'] + 'mas.. ' + this._userBookingService.userBooking.fullname);
  }

 /* verMapa(){
    this.navCtrl.push(AirportMapPage);
  }  this.path, this._userBookingService.userBooking.country['description']  */



  verMapa(){
    switch(this._itineraryProvider.userBooking.destination) {
      case '5': {
        this.mapSrc = this.path + 'cancunMap.jpg';
        this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
        console.log(this.mapSrc);
        break;
      }
      case 'Puerto Vallarta': {
        this.mapSrc = this.path + 'puertovallara_map.jpg';
        console.log(this.mapSrc);
        break;
      }
      case 'Los Cabos': {
        this.mapSrc = this.path + 'loscabos_map.jpg';
        console.log(this.mapSrc);
        break;
      }
      case 'Ciudad de Mexico': {
        this.mapSrc = this.path + 'mexicocity_map.jpg';
        console.log(this.mapSrc);
        break;
      }
      case 'Cozumel': {
        this.mapSrc = this.path + 'cozumel_map.jpg';
        console.log(this.mapSrc);
        break;
      }
      case 'Liberia, San Jose': {
        this.mapSrc = this.path + 'sanjoseliberia_map.jpg';
        console.log(this.mapSrc);
        break;
      }
      case 'Punta Cana': {
        this.mapSrc = this.path + 'puntacana_map.jpg';
        console.log(this.mapSrc);
        break;
      }
      default: {
        break;
      }
    }
  }

}
