import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

//Providers
import {ToursProvider} from "../../providers/tours/tours";

//Native
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-destinations-info',
  templateUrl: 'destinations-info.html',
})
export class DestinationsInfoPage {



  constructor(public navCtrl: NavController,
              //Plugin nativo de Youtube
              private youtube: YoutubeVideoPlayer,
              private _toursProvider:ToursProvider,
              //Plugoin nativo del navegador
              private iab: InAppBrowser) {
  }

  //Funcion que activa el reproductor nativo con el id del video
  playVideo(videoID:string){
    if(videoID){
      this.youtube.openVideo(videoID);
    }
  }

  //Funcion que activa el navegador nativo con el enlace del tour
  abrirEnlace(enlace:string){
    //Opciones para abrir el link
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    //Abrir la url
    this.iab.create(enlace, '_blank', options);
  }


}
