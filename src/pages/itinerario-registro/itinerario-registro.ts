import {Component, ViewChild} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {ContactoPage} from "../contacto/contacto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Native
//import { AgeValidator } from  '../../validators/age';
import {WheelSelector} from "@ionic-native/wheel-selector";
import {ItineraryPage} from "../itinerary/itinerary";

//Providers
import {TranslateService} from "ng2-translate";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";
import {userRegister, ItinerarioProvider} from "../../providers/itinerario/itinerario";
import {ToursProvider} from "../../providers/tours/tours";


@Component({
  selector: 'page-itinerario-registro',
  templateUrl: 'itinerario-registro.html',
})
export class ItinerarioRegistroPage {

  @ViewChild('signupSlider') signupSlider: any;

  itineraryRegister: FormGroup;
  userInfo:userRegister;
  control:number =0;
  cityId:string;
  submitAttempt: boolean = false;

  pickUpPlaces = {
    places: [
      {description: 'Cancun'},
      {description: 'Puerto Vallarta'},
      {description: 'Los Cabos'},
      {description: 'Ciudad de Mexico'},
      {description: 'Cozumel'},
      {description: 'Liberia, San Jose'},
      {description: 'Punta Cana'}
    ]
  };
  private loading: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private selector:WheelSelector,
              translate: TranslateService,
              private DKP: DeviceKeyProvider,
              private _itineraryProvider: ItinerarioProvider,
              private _toursProvider:ToursProvider,
              public loadingCtrl: LoadingController
              ) {
    this.itineraryRegister = formBuilder.group({
      fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      country: ['', Validators.required],
      destination:['', Validators.required],
      bookingnumber: ['', Validators.required]
    });
  }

  ionViewWillEnter(){
   if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey().then(response => {
        console.log(response + " Esta es mi respuesta...")
        this._toursProvider.getCountriesData();
      });
    }
  }

  pedirpaises(){
    if(this._toursProvider.CountriesColl.length <= 0) {
      this._toursProvider.getCountriesData();
    }
  }

  next(){
    this.signupSlider.slideNext();
  }

  prev(){
    this.signupSlider.slidePrev();
  }

  save(){
    this.itineraryRegister.patchValue({destination: this.cityId});
    this.submitAttempt = true;
    if(!this.itineraryRegister.valid){
      // this.signupSlider.slideTo(0);
      let toast = this.toastCtrl.create({
        message: 'Complete form data',
        duration: 3000,
        position: 'top',
        showCloseButton: true
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
    else {
      if(this.DKP.keys.lang == 1){
         this.loading = this.loadingCtrl.create({
          content: 'Verificando Información...'
        });
        this.loading.present().then();
      }
      if(this.DKP.keys.lang == 2){
         this.loading = this.loadingCtrl.create({
          content: 'Verifing info...'
        });
        this.loading.present().then();
      }
      console.log("Tengo la info del usuraio la voy a verificar!");
      this.userInfo = this.itineraryRegister.value;
      console.log(this.userInfo);
      this._itineraryProvider.addUserBookingService(this.userInfo);
      this._itineraryProvider.getItineraryData(this._itineraryProvider.userBooking.fullname, this._itineraryProvider.userBooking.bookingnumber, this._itineraryProvider.userBooking.destination).then(
        response => {
          console.log("Ya recibi respuesta exitosa!");
          if (this._itineraryProvider.Itinerary.arrival_flight) {
            this.loading.dismissAll();
            this.navCtrl.push(ItineraryPage);
          }
          if (!this._itineraryProvider.Itinerary.arrival_flight) {
            this.loading.dismissAll();
            }
          }
      );
    }
  }

  selectCountry(country:string){
    console.log(country);
    this._toursProvider.getDestinationsData(country);
    this.control = 1;
  }

  selectCity(id:string){
    this.cityId=id;
    console.log(id);
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

  abrirWheelLugares(){
    this.selector.show({
      title: 'Select Pickup Place',
      positiveButtonText: 'Choose',
      negativeButtonText: 'Cancel',
      items:[
        this.pickUpPlaces.places
      ],
      defaultItems: [
        {index:0, value:this.pickUpPlaces.places[1].description}
      ]
    }).then(result => {
      let msg = `Selected ${result[0].description}`;
      this.itineraryRegister.controls['country'].setValue(result[0]);
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 4000
      });
      toast.present();
    });
  }
  contactar(){
    this.navCtrl.push(ContactoPage);
  }

}
