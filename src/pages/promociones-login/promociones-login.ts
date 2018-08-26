import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {PromocionesPage} from "../promociones/promociones";
import {IntroPage} from "../intro/intro";

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the PromocionesLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-promociones-login',
  templateUrl: 'promociones-login.html',
})
export class PromocionesLoginPage {
  isLoggedIn:boolean = false;
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth: AngularFireAuth,
              public storage: Storage,
              private callNumber: CallNumber,
              public actionSheetCtrl: ActionSheetController,
              public usuarioProv: UsuarioProvider, private fb: Facebook, private platform: Platform) {

    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));

  }

  ionViewDidLoad(){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      this.navCtrl.setRoot(PromocionesPage);
    }

    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });
  }

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then(
          user => {
            console.log(user);
            this.usuarioProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              'facebook'
            );
            this.navCtrl.setRoot(PromocionesPage);
          }).catch(e => console.log("Error con el login" + JSON.stringify(e)));
      });
    }else{
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          let user = res.user;
          this.usuarioProv.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'facebook'
          );

          this.navCtrl.setRoot(PromocionesPage);

        });
    }

  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  callWhats(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contáctanos',
      buttons: [
        {
          text: 'Whatsapp',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Llamar',
          handler: () => {
            this.callNumber.callNumber("+521557901692", true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
