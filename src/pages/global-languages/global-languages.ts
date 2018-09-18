import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {availableLanguages, sysOptions} from "./global-languages.constants";
import {TranslateService} from "ng2-translate";

//Providers
import {DeviceKeyProvider} from "../../providers/device-key/device-key";

//Native
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";


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
              //Navegador nativo para ver las politicas
              private iab: InAppBrowser) {
    this.translate = translate;
  }

  //Se aplica el lenguaje seleccionado
  applyLanguage() {
    this.translate.use(this.selectedLanguage);
    if(this.selectedLanguage=="es"){this.DKP.keys.lang= 1;}
    if(this.selectedLanguage=="en"){this.DKP.keys.lang= 2;}
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
