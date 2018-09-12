import { Component } from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {UsuarioProvider} from "../../providers/usuario/usuario";

import { Facebook } from '@ionic-native/facebook';
import {CallNumber} from "@ionic-native/call-number";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {Offer} from "../../providers/destinations/destinations";
import {ContactoPage} from "../contacto/contacto";
import {PromocionesProvider} from "../../providers/promociones/promociones";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";


@Component({
  selector: 'page-promociones-login',
  templateUrl: 'promociones-login.html',
})
export class PromocionesLoginPage {
  offers:Offer[] = [
    {
      imageLink:"https://imagesmx-olympustours1.netdna-ssl.com/thumbnail.php?url=L2dhbGVyaWEvUFVOVEFDQU5BLVNXSU1XRE9MUEhJTlMxLTc3MFg0MDAuanBn&size=395x205",
      title: "Sunset Cruise",
      subtitle: "Los Cabos, Mexico",
      content: "Make this an unforgettable vacation with a fun-filled, romantic sunset cruise! There’s a kind of magic on the air, a unique sensation felt when sailing as the sun sets in the Los Cabos coast, as the light reflects on the water and the buildings' windows along the Cabo San Lucas skyline, portraying a beautiful silhouette over The Arch, the most iconic spot of Cabo San Lucas, at the very edge of the peninsula. (Yes, that place you’ve seen in thousands of photos is real)",
      link: "https://www.olympus-tours.com/tours/puerto-vallarta/marieta-island-boat"
    },
    {
      imageLink:"https://imagesmx-olympustours1.netdna-ssl.com/thumbnail.php?url=L2dhbGVyaWEvTWFyaW5hcml1bTUuanBn&size=395x205",
      title: "Marinarium Snorkeling",
      subtitle: "La Romana",
      content: "Marinarium invites you to discover the wonders of the reef and the marine life." ,
      link: "https://www.olympus-tours.com/tours/la-romana/marinarium-snorkeling-romana"
    }
  ];

  isLoggedIn:boolean;
  users: any;

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private iab: InAppBrowser,
              private callNumber: CallNumber,
              private _promocionesProvider:PromocionesProvider,
              private DKP: DeviceKeyProvider,
              private actionSheetCtrl: ActionSheetController,
              private _usuarioProv: UsuarioProvider,
              private fb: Facebook) {



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

    //this._usuarioProv.cargarUsuario("sdfsdf", "dfsdfsdfdf", "dfsdfsdfdsfdsfdfsd");


  }

  ionViewDidLoad(){
    if(this._promocionesProvider.PromocionesColl.length<=0){
      this._promocionesProvider.getPromocionesData();
    }
      this.storage.get('flogin').then(done => {
        if(!done) {
          console.log("Este es fblogin" + done);
          this.storage.set('flogin', false);
          this.isLoggedIn = false;
        }else if(done){
          this.isLoggedIn = true;
        }
      });
  }

  ionViewDidEnter(){
    if(this.DKP.chaeckLan())this._promocionesProvider.getPromocionesData();
  }

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.storage.get('flogin').then(done => {
            if(!done) {
              this.storage.set('flogin', true);
              this.isLoggedIn = true;
            }
            if(done != true){
              this.storage.set('flogin', true);
              this.isLoggedIn = true;
            }
          });
          this.getUserDetail(res.authResponse.userID);
          console.log(res);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logout() {
    this.fb.logout()
      .then( res => {
        this.isLoggedIn = false;
        this.storage.get('flogin').then(done => {
          if(!done) {
            this.storage.set('flogin', false);
            this.isLoggedIn = false;
          }else if(done == true){
            this.storage.set('flogin', false);
            this.isLoggedIn = false;
          }
        });
      })
      .catch(e => console.log('Error logout from Facebook', e));
  }
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
        console.log("Este es el user....");
        console.log(this.users);
        console.log(res.name + res.email + res.id);
        this._usuarioProv.cargarUsuario(this.users.name, this.users.email, this.users.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,age_range,email,name,picture,gender,location",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }
  */

  /*

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

            this.storage.get('flogin').then(done => {
              if(!done) {
                this.storage.set('flogin', true);
                this.navCtrl.setRoot(PromocionesPage);
              }
              if(done != true){
                this.storage.set('flogin', true);
                this.navCtrl.setRoot(PromocionesPage);
              }
            });

          }).catch(e => console.log("Error con el login" + JSON.stringify(e)));
      });
    }
  }
  */

  callWhats(){
    this.navCtrl.push(ContactoPage);
    /*
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
    */
  }

  navigateToOffer(linkToOffer:string){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };

    //Abrir la url
    this.iab.create(linkToOffer, '_blank', options);
  }

}
