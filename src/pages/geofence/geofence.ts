import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';


//Native
//import { Geofence } from '@ionic-native/geofence';

/**
 * Generated class for the GeofencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-geofence',
  templateUrl: 'geofence.html',
})
export class GeofencePage {
  constructor(public navCtrl: NavController,
              public platform: Platform,
              //private geofence: Geofence
              ) {
  }

    /*geofence.initialize().then(
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )

    platform.ready().then(() => {
      this.getPlaces();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeofencePage');
  }

  private addGeofence(id, idx, lat, lng, place, desc) {
    let fence = {
      id: id,
      latitude: lat,
      longitude: lng,
      radius: 50,
      transitionType: 3,
      notification: {
        id: idx,
        title: 'You crossed ' + place,
        text: desc,
        openAppOnClick: true
      }
    }

    this.geofence.addOrUpdate(fence).then(
      () => console.log('Geofence added'),
      (err) => console.log('Geofence failed to add')
    );
  }

  getPlaces() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -6.854359, lng: 107.598455},
      zoom: 17
    });
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: {lat: -6.854359, lng: 107.598455},
      radius: 500,
      type: ['restaurant']
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          this.addGeofence(results[i].id, i+1, results[i].geometry.location.lat(), results[i].geometry.location.lng(), results[i].name, results[i].vicinity);
        }
      }
    });
  }*/


}
