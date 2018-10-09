import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  //Informacion para slides de introduccion

  slides:any[] = [
    {
      title: "Bienvenido!!!",
      description: "Esta <b>aplicación</b> hará tu viaje mucho más fácil!",
      image: "assets/intro/1_slides-intro-06.png",
    },
    {
      title: "Accede a toda tu información",
      description: "<b>Olympus Tours</b> pone a tu disposición un mapa para tu llegada al aeropuerto",
      image: "assets/intro/2_slides-intro_slide-bienvenida.png",
    },
    {
      title: "No dejes de viajar",
      description: "Aquí encontrarás las información sobre los viajes más relevantes",
      image: "assets/intro/3_slides-intro_tours.png",
    },
    {
      title: "Accede a beneficios exclusivos",
      description: "Ingresa con tu facebook para recibir promociones únicas por usar esta App",
      image: "assets/intro/4_slides-intro_promotions.png",
    },
    {
      title: "Estás seguro",
      description: "Consulta nuestra política de privacidad desde la sección de ajustes",
      image: "assets/intro/5_slides-intro_settings.png",
    },
    {
      title: "Siempre estamos para ti",
      description: "En todas nuestras secciones podrás ponerte en contacto con nosotros para aclarar cualquier duda o adquirir un servicio",
      image: "assets/intro/6_slides-intro_telefono.png",
    }
  ];


  constructor(public navCtrl: NavController, private DKP:DeviceKeyProvider) {
  }

  ionViewDidLoad(){
    if(this.DKP.keys.lang == 2){
      this.slides = [
        {
          title: "Welcome!!!",
          description: "This <b>App</b> will make your journey easier!",
          image: "assets/intro/1_slides-intro-06.png",
        },
        {
          title: "Access all your info",
          description: "<b>Olympus Tours</b> makes your map available for your arrival at the airport",
          image: "assets/intro/2_slides-intro_slide-bienvenida.png",
        },
        {
          title: "Don't stop traveling",
          description: "Here you will find information about the most relevant trips",
          image: "assets/intro/3_slides-intro_tours.png",
        },
        {
          title: "Access exclusive benefits\n",
          description: "Enter with your facebook to receive unique promotions to use this App",
          image: "assets/intro/4_slides-intro_promotions.png",
        },
        {
          title: "You are safe",
          description: "Check our privacy policy from the settings section",
          image: "assets/intro/5_slides-intro_settings.png",
        },
        {
          title: "We are always here for you",
          description: "In all our sections you can contact us to clarify any questions or purchase a service",
          image: "assets/intro/6_slides-intro_telefono.png",
        }
      ];
    }
  }

//Ir al contolador de pestanas principal del app
  navHome() {
  this.navCtrl.setRoot(TabsPage);
}


}
