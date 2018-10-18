import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-airport-map',
  templateUrl: 'airport-map.html',
})
export class AirportMapPage {

  mapSrc:string = '';

 private maps: Array<any> = [];

constructor(public navCtrl: NavController,
              public navParams: NavParams) {

//Se obtiene el parametro de la pagina anterior para mostrar el mapa, en caso de ser cancun se muestra toda una galeria
    if (this.navParams.get('mapPath')) {
      if(this.navParams.get('mapPath') == 'assets/maps/map_cancun_term23_en.jpg'){
        this.maps = [
          {
            url: 'assets/maps/map_cancun_term23_en.jpg'
          },
          {
            url: 'assets/maps/map_cancun_term4_en.jpg'
          },
          {
            url: 'assets/maps/mapa_cancunAB_es.jpg'
          }
        ];
      } else if(this.navParams.get('mapPath') == 'assets/maps/map_cancun_term23_en.jpg'){
         this.maps = [
          {
            url: 'assets/maps/map_cancun_term23_es.jpg'
          },
          {
            url: 'assets/maps/map_cancun_term4_es.jpg'
          },
          {
            url: 'assets/maps/mapa_cancunAB_es.jpg'
          }
        ];
      } else {
        this.maps = [
          {
            url: this.navParams.get('mapPath')
          }
        ];
      }
      console.log(this.navParams.get('mapPath'));
      this.mapSrc = this.navParams.get('mapPath');
    }
  }

}
