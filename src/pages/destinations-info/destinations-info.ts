import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {ToursProvider} from "../../providers/tours/tours";

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



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private youtube: YoutubeVideoPlayer,
              private _toursProvider:ToursProvider,
              private iab: InAppBrowser) {
  }

  playVideo(videoID:string){
    if(videoID){
      this.youtube.openVideo(videoID);
    }
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
