import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, fcm: FcmProvider, toastCtrl: ToastController) {
    platform.ready().then(() => {



  // Obtener token FCM
      if(platform.is('cordova')){
        // Get a FCM token
        fcm.getToken();

  // Escuchar notificaciones
        fcm.listenToNotifications().pipe(
          tap(msg => {
            let messageText: string;
            if (platform.is('android')) {
              messageText = msg.body;
            }
            if (platform.is('ios')) {
              messageText = msg.aps.alert;
            }
  // Mostrar toast si se recive una notificación
            const toast = toastCtrl.create({
              message: messageText,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          })).subscribe();
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
