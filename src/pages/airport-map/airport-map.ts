import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-airport-map',
  templateUrl: 'airport-map.html',
})
export class AirportMapPage {

  cityMap:string = this.navParams.get('cityName');
  mapSrc:string = '';
  path:string='../www/assets/maps/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    if (this.navParams.get('mapPath')) {
      console.log(this.navParams.get('mapPath'));
      this.mapSrc = this.navParams.get('mapPath');
    }

    //console.log( this._userBookingService.userBooking.country['description']);

  }

  ionViewDidLoad(){
   // this.mostrarMapa(this.path, this._userBookingService.userBooking.country['description']);
  }

}
