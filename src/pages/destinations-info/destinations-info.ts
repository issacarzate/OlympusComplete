import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {DestinationsProvider, Tour} from "../../providers/destinations/destinations";
import {Observable} from "rxjs/Observable";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

/**
 * Generated class for the DestinationsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-destinations-info',
  templateUrl: 'destinations-info.html',
})
export class DestinationsInfoPage {
  tours: Observable<Tour[]>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private youtube: YoutubeVideoPlayer,
              private _destinationsProvider:DestinationsProvider,
              private iab: InAppBrowser) {
    this.tours = this._destinationsProvider.toursCollection.valueChanges();
  }

  playVideo(videoID:string){
    this.youtube.openVideo(videoID);
  }
  abrirEnlace(enlace:string){
    //Opciones para abrir el link
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };

    //Abrir la url
    this.iab.create(enlace, '_blank', options);
  }


}
