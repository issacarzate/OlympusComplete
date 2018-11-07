import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

//Native
import {AirportMapPage} from "../airport-map/airport-map";
import {ItinerarioProvider} from "../../providers/itinerario/itinerario";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";
import {Storage} from "@ionic/storage";
import {ItinerarioRegistroPage} from "../itinerario-registro/itinerario-registro";
import {LocalNotifications} from "@ionic-native/local-notifications";

@IonicPage()
@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html',
})

export class ItineraryPage {
  mapSrc:string = '';
  path:string='assets/maps/';
  mesIda:string;
  diaIda:string;
  mesRegreso:string;
  diaRegreso:string;
  year:string;
  yearRegreso:string;
  ida:string;
  regreso:string;
  notificationDate:string;

  tituloNotificacion:string;
  textoNotificacion:string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private _itineraryProvider: ItinerarioProvider,
              private DKP:DeviceKeyProvider,
              private localNotifications: LocalNotifications) {
  }

  //Calculo de todas las fechas en formato correcto y creacion de notificacion en fecha del vuelo
  ionViewDidLoad() {
    if(this.DKP.keys.lang == 1){
      this.mesIda = this._itineraryProvider.Itinerary.arrival_date_numeric.toString().slice(0,-6);
      this.diaIda = this._itineraryProvider.Itinerary.arrival_date_numeric.toString().slice(-6,-4);
      this.year =  this._itineraryProvider.Itinerary.arrival_date_numeric.toString().slice(-4);
      this.diaRegreso = this._itineraryProvider.Itinerary.departure_date_numeric.toString().slice(-6,-4);
      this.mesRegreso = this._itineraryProvider.Itinerary.departure_date_numeric.toString().slice(0,-6);
      this.yearRegreso = this._itineraryProvider.Itinerary.departure_date_numeric.toString().slice(-4);
      this.regreso = this.diaRegreso + "-" + this.mesRegreso + "-" + this.yearRegreso;
      this.notificationDate = this._itineraryProvider.Itinerary.arrival_date.slice(0,-9);
     // this.mesRegreso = "";
      //this.diaRegreso = "";
      this.ida = this._itineraryProvider.Itinerary.arrival_date.slice(0,-9);
      console.log('Fecha de notificacion: ' + new Date(this.notificationDate));
      this.regreso = this._itineraryProvider.Itinerary.departure_date.slice(0,-8);
      this.calcularFecha(this.mesIda);
      this.idiomaNotificacio();
      this.localNotifications.cancelAll().then(()=>{
        this.localNotifications.schedule([{
          title: this.tituloNotificacion,
          text: this.textoNotificacion,
          led: 'FF0000',
          trigger: {at: new Date(this.notificationDate)
          }
        }]);
      }).catch(err => console.log(err));
    }
    if(this.DKP.keys.lang == 2){
      this.mesIda = this._itineraryProvider.Itinerary.arrival_date_numeric.toString().slice(0,-6);
      this.diaIda = this._itineraryProvider.Itinerary.arrival_date_numeric.toString().slice(-6,-4);
      this.year =  this._itineraryProvider.Itinerary.arrival_date_numeric.toString().slice(-4);
      this.diaRegreso = this._itineraryProvider.Itinerary.departure_date_numeric.toString().slice(0,-6);
      this.mesRegreso = this._itineraryProvider.Itinerary.departure_date_numeric.toString().slice(-6,-4);
      this.yearRegreso = this._itineraryProvider.Itinerary.departure_date_numeric.toString().slice(-4);
      this.regreso = this.diaRegreso   + "-" + this.mesRegreso + "-" + this.yearRegreso;
      this.ida = this.mesIda + "-" + this.diaIda + "-" + this.year;
      this.notificationDate = this._itineraryProvider.Itinerary.arrival_date.slice(0,-9);
      //this.ida = this._itineraryProvider.Itinerary.arrival_date.slice(0,-9);
      console.log('Fecha de notificacion: ' + new Date(this.notificationDate));
      //this.regreso = this._itineraryProvider.Itinerary.departure_date.slice(0,-8);
      this.calcularFecha(this.mesIda);
      this.idiomaNotificacio();
      this.localNotifications.cancelAll().then(()=>{
        this.localNotifications.schedule([{
          title: this.tituloNotificacion,
          text: this.textoNotificacion,
          led: 'FF0000',
          trigger: {at: new Date(this.notificationDate)
          }
        }]);
      }).catch(err => console.log(err));
    }
  }

  //Manejo de informacion del itinerario en almacenamiento local
  logout(){
    this.storage.remove('iUser');
    this.navCtrl.setRoot(ItinerarioRegistroPage);
  }

  //Mostrar las siglas de la fecha de acuerdo al idioma del usuario y su fecha de llegada
 calcularFecha(mes:string){
   if(this.DKP.keys.lang==1){
     switch(mes) {
       case '01': {
         this.mesIda = 'Ene';
         break;
       }
       case '02': {
         this.mesIda = 'Feb';
         break;
       }
       case '03': {
         this.mesIda = 'Mar';
         break;
       }
       case '04': {
         this.mesIda = 'Abr';
         break;
       }
       case '05': {
         this.mesIda = 'May';
         break;
       }
       case '06': {
         this.mesIda = 'Jun';
         break;
       }
       case '07': {
         this.mesIda = 'Jul';
         break;
       }
       case '08': {
         this.mesIda = 'Ago';
         break;
       }
       case '09': {
         this.mesIda = 'Sep';
         break;
       }
       case '10': {
         this.mesIda = 'Oct';
         break;
       }
       case '11': {
         this.mesIda = 'Nov';
         break;
       }
       case '12': {
         this.mesIda = 'Dic';
         break;
       }
       default: {
         console.log("Mes Erróneo");
         break;
       }
     }
   } else {
     switch(mes) {
       case '1': {
         this.mesIda = 'Jan';
         break;
       }
       case '2': {
         this.mesIda = 'Feb';
         break;
       }
       case '3': {
         this.mesIda = 'Mar';
         break;
       }
       case '4': {
         this.mesIda = 'Apr';
         break;
       }
       case '5': {
         this.mesIda = 'May';
         break;
       }
       case '6': {
         this.mesIda = 'Jun';
         break;
       }
       case '7': {
         this.mesIda = 'Jul';
         break;
       }
       case '8': {
         this.mesIda = 'Aug';
         break;
       }
       case '9': {
         this.mesIda = 'Sep';
         break;
       }
       case '10': {
         this.mesIda = 'Oct';
         break;
       }
       case '11': {
         this.mesIda = 'Nov';
         break;
       }
       case '12': {
         this.mesIda = 'Dec';
         break;
       }
       default: {
         console.log("Mes Erróneo");
         break;
       }
     }
   }

 }

/*Funcion para mostrar el mapa guardado en la memoria del sistema ligado al destino del usuario
Se carga otra pagina en el stack con el visualizador
*/
  verMapa(){
    if(this.DKP.keys.lang == 1){
      switch(this._itineraryProvider.Itinerary.destination) {

        case '10': {
          this.mapSrc = this.path + 'mapa_puertplata_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '1': {
          this.mapSrc = this.path + 'map_cancun_term23_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '62': {
          this.mapSrc = this.path + 'mapa_liberia_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '52': {
          this.mapSrc = this.path + 'mapa_sanjose_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '8': {
          this.mapSrc = this.path + 'mapa_laromana_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '13': {
          this.mapSrc = this.path + 'mapa_santiago_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '7': {
          this.mapSrc = this.path + 'map_puntacana_termab_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '3': {
          this.mapSrc = this.path + 'mapa_cozumel_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '4': {
          this.mapSrc = this.path + 'mapa_loscabos_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '15': {
          this.mapSrc = this.path + 'mapa_stoDomingo_es.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        default: {
          break;
        }
      }
    }else{
      switch(this._itineraryProvider.Itinerary.destination) {
        case '20': {
          this.mapSrc = this.path + 'map_puertoplata_pop_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '11': {
          this.mapSrc = this.path + 'map_cancun_term23_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '63': {
          this.mapSrc = this.path + 'map_costarica_lib_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '53': {
          this.mapSrc = this.path + 'map_costarica_sanjose_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '18': {
          this.mapSrc = this.path + 'map_laromana_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '10': {
          this.mapSrc = this.path + 'map_santiago_sti_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '15': {
          this.mapSrc = this.path + 'map_cancun_term4_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '17': {
          this.mapSrc = this.path + 'map_puntacana_termab_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
        break;
        }
        case '13': {
          this.mapSrc = this.path + 'mapa_cozumel_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '14': {
          this.mapSrc = this.path + 'map_loscabos_term12_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        case '25': {
          this.mapSrc = this.path + 'mapa_stoDomingo_en.jpg';
          this.navCtrl.push(AirportMapPage, {mapPath: this.mapSrc});
          console.log(this.mapSrc);
          break;
        }
        default: {
          break;
        }
      }
    }
  }


  //Creamos la notificacion en el idioma del usuario
  idiomaNotificacio(){
    if(this.DKP.keys.lang==1){
      this.textoNotificacion = 'Revisa el mapa del aeropuerto de tu itinerario';
      this.tituloNotificacion = 'No olvides revisar el mapa al llegar al aeropuerto.';
    }else{
      this.textoNotificacion = 'Check your itinerary airport map';
      this.tituloNotificacion = 'Don`t forget to check airport map at your arrival.';
    }
  }

}
