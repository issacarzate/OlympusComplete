import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {AirportMapPage} from "../airport-map/airport-map";

//Native
import {DestinationsProvider} from "../../providers/destinations/destinations";
import {AirportMapPage} from "../airport-map/airport-map";


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _userBookingService:DestinationsProvider) {
  }

  ionViewDidLoad() {
    //console.log('Esta eeeees ' + this._userBookingService.userBooking.country['description'] + 'mas.. ' + this._userBookingService.userBooking.fullname);
  }

 /* verMapa(){
    this.navCtrl.push(AirportMapPage);
  }  this.path, this._userBookingService.userBooking.country['description']  */



  verMapa(){
    switch(this._userBookingService.userBooking.country['description']) {
      case 'Cancun': {
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
