import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";

import { MyApp } from './app.component';

import {ItinerarioRegistroPage} from "../pages/itinerario-registro/itinerario-registro";
import {PromocionesLoginPage} from "../pages/promociones-login/promociones-login";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import {ContactoPage} from "../pages/contacto/contacto";
import {DestinationsPage} from "../pages/destinations/destinations";
import { PromocionesPage } from '../pages/promociones/promociones';
import {DestinationsCitiesPage} from "../pages/destinations-cities/destinations-cities";
import {DestinationsInfoPage} from "../pages/destinations-info/destinations-info";
import {AirportMapPage} from "../pages/airport-map/airport-map";
import {ItineraryPage} from "../pages/itinerary/itinerary";
import {GlobalLanguagesPageModule} from "../pages/global-languages/global-languages.module";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';

import {IonicImageViewerModule} from "ionic-img-viewer";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

//Cordova
import { Facebook } from '@ionic-native/facebook';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SocialSharing} from "@ionic-native/social-sharing";
import {CallNumber} from "@ionic-native/call-number";
import {WheelSelector} from "@ionic-native/wheel-selector";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import {LocalNotifications} from "@ionic-native/local-notifications";



//Providers
import { DestinationsProvider } from '../providers/destinations/destinations';
import { HttpClientModule } from "@angular/common/http";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Http} from "@angular/http";
import {Globalization} from "@ionic-native/globalization";
import { ToursProvider } from '../providers/tours/tours';
import { ContactoProvider } from '../providers/contacto/contacto';
import { DeviceKeyProvider } from '../providers/device-key/device-key';
import { ItinerarioProvider } from '../providers/itinerario/itinerario';
import { PromocionesProvider } from '../providers/promociones/promociones';
import { FcmProvider } from '../providers/fcm/fcm';


var config = {
  apiKey: "AIzaSyAirYs6_nfZUfIGzQAg02K-8GCKbmUg7VA",
  authDomain: "olympustours-68a74.firebaseapp.com",
  databaseURL: "https://olympustours-68a74.firebaseio.com",
  projectId: "olympustours-68a74",
  storageBucket: "olympustours-68a74.appspot.com",
  messagingSenderId: "183548698238"
};
//firebase.initializeApp(firebaseConfig);

import {Firebase} from "@ionic-native/firebase";


export function createTranslateLoader(http: Http){
  return new TranslateStaticLoader(http, 'assets/languages', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AirportMapPage,
    ItinerarioRegistroPage,
    PromocionesLoginPage,
    HomePage,
    TabsPage,
    PromocionesPage,
    IntroPage,
    ContactoPage,
    DestinationsPage,
    DestinationsCitiesPage,
    DestinationsInfoPage,
    ItineraryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        android: {
          activator: 'none'
        }
      }
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFirestoreModule,
    GlobalLanguagesPageModule,
    IonicImageViewerModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AirportMapPage,
    ItinerarioRegistroPage,
    PromocionesLoginPage,
    HomePage,
    TabsPage,
    PromocionesPage,
    IntroPage,
    ContactoPage,
    DestinationsPage,
    DestinationsCitiesPage,
    DestinationsInfoPage,
    ItineraryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Facebook,
    IonicStorageModule,
    ToursProvider,
    DeviceKeyProvider,
    UsuarioProvider,
    ItinerarioProvider,
    InAppBrowser,
    SocialSharing,
    DestinationsProvider,
    ContactoProvider,
    CallNumber,
    LocalNotifications,
    WheelSelector,
    YoutubeVideoPlayer,
    PhotoViewer,
    File,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Globalization,
    PromocionesProvider,
    FcmProvider,
    Firebase
  ]
})
export class AppModule {}
