import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {ContactoPage} from "../contacto/contacto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Native
import {ItineraryPage} from "../itinerary/itinerary";

//Providers
import {TranslateService} from "ng2-translate";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";
import {UserRegisterForm, ItinerarioProvider} from "../../providers/itinerario/itinerario";
import {ToursProvider} from "../../providers/tours/tours";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-itinerario-registro',
  templateUrl: 'itinerario-registro.html',
})
export class ItinerarioRegistroPage {


  itineraryRegister: FormGroup;
  userInfo:UserRegisterForm;
  control:number =0;
  cityId:string;
  submitAttempt: boolean = false;
  controlUser:boolean = false;
  private loading: any;

  mensajeToastUsuarioInc:string;
  mensajeToastFormularioInvalido:string;
  verificacionFormulario:string;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              translate: TranslateService,
              private DKP: DeviceKeyProvider,
              private storage: Storage,
              private _itineraryProvider: ItinerarioProvider,
              private _toursProvider:ToursProvider,
              public loadingCtrl: LoadingController
              ) {

    //Se declara el formulario en el constructor con cuatro campos y solo se enviaran tres, El nombre admite letras y espacios
    this.itineraryRegister = formBuilder.group({
      fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      country: ['', Validators.required],
      destination:['', Validators.required],
      bookingnumber: ['', Validators.required]
    });
  }

  ionViewWillEnter(){
    //Se pide un token en caso de no tenerlo aun.
   if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey().then(response => {
        this._toursProvider.getCountriesData();
      });
    }
    //si ya se tiene un usuario guardado en almacenamiento nativo se dirije al itinerario
    this.storage.get('iUser').then(done => {
      if(done) {
        console.log("Esto es lo que tenia guardado como usuarios...." + done);
        this._itineraryProvider.Itinerary = JSON.parse(done);
        this.navCtrl.setRoot(ItineraryPage);
      }else if(!done){
        this.controlUser = true;
      }
    });
   //Validacion del idioma del usuario para mensajes de error
   if(this.DKP.keys.lang==1){
     this.mensajeToastFormularioInvalido = 'Completa los datos';
     this.mensajeToastUsuarioInc = 'Usuario no encontrado';
     this.verificacionFormulario = 'Verificando Información...';
   }else{
     //Mensajes en ingles
     this.mensajeToastFormularioInvalido = 'Complete form data';
     this.mensajeToastUsuarioInc = 'Not found user';
     this.verificacionFormulario = 'Verifing info...';
   }
  }

  //Si no se tienen los paise se piden, en caso de tenerlo ya no hay otra peticion.
  pedirpaises(){
    if(this._toursProvider.CountriesColl.length <= 0) {
      this._toursProvider.getCountriesData();
    }
  }


  save(){
    //Se sustituye el nombre del destino por el id para hacer la peticion.
    this.itineraryRegister.patchValue({destination: this.cityId});
    //Se autoriza el envio del formulario con toda la informacion correcta
    this.submitAttempt = true;
    //Si el fomrulario no es valido se le dice al usuario por medio de un toast.
    if(!this.itineraryRegister.valid){
      let toast = this.toastCtrl.create({
        message: this.mensajeToastFormularioInvalido,
        duration: 3000,
        position: 'top',
        showCloseButton: true
      });
      toast.present();
    }
    //Si el formulario es valido se indica al usuario que la peticion esta en proceso mediante un loadingCtrl.
    else {
         this.loading = this.loadingCtrl.create({
          content: this.verificacionFormulario
        });
        this.loading.present().then();

      this.userInfo = this.itineraryRegister.value;
      console.log(this.userInfo);
      this._itineraryProvider.addUserBookingService(this.userInfo);
      this._itineraryProvider.getItineraryData(this._itineraryProvider.userBooking.fullname, this._itineraryProvider.userBooking.bookingnumber, this._itineraryProvider.userBooking.destination).then(
        response => {
          if (this._itineraryProvider.Itinerary.arrival_flight) {
            this.storage.get('iUser').then(done => {
              if(!done) {
                this.storage.set('iUser', JSON.stringify(this._itineraryProvider.Itinerary));
              }else if(done){
                this.storage.set('iUser', JSON.stringify(this._itineraryProvider.Itinerary));
              }
            });
            this.loading.dismissAll();
            this.navCtrl.setRoot(ItineraryPage);
          }
          if (!this._itineraryProvider.Itinerary.arrival_flight) {
            let toast = this.toastCtrl.create({
              message: this.mensajeToastUsuarioInc,
              duration: 3000,
              position: 'top',
              showCloseButton: true
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
            this.loading.dismissAll();
            }
          }
      );
    }
  }

  //Al seleccionar un pais se muestra con el control el seleccionador de destinos y se piden los destinos de ese pais.
  selectCountry(country:string){
    this._toursProvider.getDestinationsData(country);
    this.control = 1;
  }

  //Al seleccionar una ciudad se guarda su id para anadir ese valor al formulario
  selectCity(id:string){
    this.cityId=id;
  }

  selectOk(country:string){
    console.log("OK OK OK " + country);
  }

  onCancelCountry(){
    this.control = 0;
  }

  onCancelCity(){
    this.control = 1;
  }

  contactar(){
    this.navCtrl.push(ContactoPage);
  }

}
