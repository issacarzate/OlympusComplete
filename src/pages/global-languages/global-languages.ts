import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {availableLanguages, sysOptions} from "./global-languages.constants";
import {TranslateService} from "ng2-translate";

//Providers
import {DeviceKeyProvider} from "../../providers/device-key/device-key";

//Native
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-global-languages',
  templateUrl: 'global-languages.html',
})
export class GlobalLanguagesPage {

  //Ligas de las politicas de olympus tours
  politicas =[{
    liga: "https://www.olympus-tours.com/terms-conditions#terms_conditions"
  },{
    liga: "https://www.olympus-tours.com/terms-conditions#privacy"
  }];

  //Idiomas disponibles en el app e idioma del sistema
  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;

  //Servicio de traduccin
  private translate: TranslateService;

  constructor(translate: TranslateService,
              private DKP:DeviceKeyProvider,
              private storage: Storage,
              //Navegador nativo para ver las politicas
              private iab: InAppBrowser) {
    this.translate = translate;

  }

//Checa si el idioma para mostrar terminos correctos al usuario
  ionViewWillEnter(){
    if(this.DKP.keys.lang == 1){
      this.politicas =[{
        liga: "https://www.olympus-tours.com.mx/terminos.php"
      },{
        liga: "https://www.olympus-tours.com.mx/politicas_privacidad.php"
      }];
    }
  }



  //Se aplica el lenguaje seleccionado y cambvia las ligas de terminos a las correctas sobre la marcha
  applyLanguage(code) {
    this.translate.use(code);
    if(code=="es"){
      this.storage.set('lenguaje', 'es');
      this.DKP.keys.lang= 1;
      this.DKP.lastLang=2;

      this.politicas =[{
        liga: "https://www.olympus-tours.com.mx/terminos.php"
      },{
        liga: "https://www.olympus-tours.com.mx/politicas_privacidad.php"
      }];

    }
    if(code=="en"){
      this.storage.set('lenguaje', 'en');
      this.DKP.keys.lang= 2;
      this.DKP.lastLang=1;

      this.politicas =[{
        liga: "https://www.olympus-tours.com/terms-conditions#terms_conditions"
      },{
        liga: "https://www.olympus-tours.com/terms-conditions#privacy"
      }];
    }
  }

  //Abre las politicas de olympus tours
  abrirEnlace(enlace:string){
    console.log(enlace);
    //Opciones para abrir el link
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    //Abrir la url
    this.iab.create(enlace, '_blank', options);
  }

}
