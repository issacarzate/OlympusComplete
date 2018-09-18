import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {ContactoPage} from "../contacto/contacto";

//Providers
import {PromocionesProvider} from "../../providers/promociones/promociones";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";
import {UsuarioProvider} from "../../providers/usuario/usuario";

//Native
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-promociones-login',
  templateUrl: 'promociones-login.html',
})
export class PromocionesLoginPage {

  isLoggedIn:boolean;
  users: any;

  constructor(private navCtrl: NavController,
              //Plugin de storage nativo para guardar sesion
              private storage: Storage,
              //Plugin navegador nativo para ver promociones
              private iab: InAppBrowser,
              private DKP: DeviceKeyProvider,
              private _usuarioProv: UsuarioProvider,
              private _promocionesProvider:PromocionesProvider,
              //Plugin nativo facebook
              private fb: Facebook) {
  }

  //Revisamos si ya esta logeado para que no lo vuelva hacer
  ionViewDidLoad(){
    if(this._promocionesProvider.PromocionesColl.length<=0){
      this._promocionesProvider.getPromocionesData();
    }
      this.storage.get('flogin').then(done => {
        if(!done) {
          this.isLoggedIn = false;
        }else if(done){
          this.isLoggedIn = true;
        }
      });
  }

  //Revisa si cambio el idioma para perdir promociones de nuevo
  ionViewDidEnter(){
    if(this.DKP.chaeckLan())this._promocionesProvider.getPromocionesData();
  }

  //Hacemos peticion a facebook para autorizar la entrada a promociones
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
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  //Se destruye la sesion del usuario
  logout() {
    this.fb.logout()
      .then( res => {
        this.isLoggedIn = false;
        this.storage.get('flogin').then(done => {
          if(!done) {
            this.isLoggedIn = false;
          }else if(done == true){
            this.storage.remove('flogin');
            this.isLoggedIn = false;
          }
        });
      })
      .catch(e => console.log('Error logout from Facebook', e));
  }

  //Se obtienen los datos que pedimos a facebook y se mandan a nuestro usuario
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        this.users = res;
        this._usuarioProv.cargarUsuario(this.users.name, this.users.email, this.users.id);
      })
      .catch(e => {
        console.log(e);
      });
  }


  //Metemos al stack la pagina de contacto y permite regresar a las promociones
  contactar(){
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
