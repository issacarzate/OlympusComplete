import { Injectable } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {Platform} from "ionic-angular";

//Native
import {Firebase} from "@ionic-native/firebase";


@Injectable()
export class FcmProvider {

  constructor(public firebaseNative: Firebase,
              //Accedemos a nuestro firestore con esta dependencia
              public afs: AngularFirestore,
              //Detectamos en que plataforma estamos
              private platform: Platform) {
    console.log('Hello FcmProvider Provider');
  }

//Se obtiene el token de manera asincrona dependiendo la plataforma el usuario debe aprobarlo
  async getToken() {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token)
  }

  //Se guarda el token del dispositivo en base de datos
  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');

//Se guarda como tupla de token y usuario por si se quiere poner alguna informacion adicional aqui
    const docData = {
      token,
      userId: 'testUser',
    };

    return devicesRef.doc(token).set(docData)
  }

  //Manejamos las notificaciones con el app abierta
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }
}
