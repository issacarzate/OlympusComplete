import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {availableLanguages, sysOptions} from "./global-languages.constants";
import {TranslateService} from "ng2-translate";
import {DeviceKeyProvider} from "../../providers/device-key/device-key";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

/**
 * Generated class for the GlobalLanguagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-global-languages',
  templateUrl: 'global-languages.html',
})
export class GlobalLanguagesPage {

  politicas =[{
    liga: "https://www.olympus-tours.com/terms-conditions#terms_conditions"
  },{
    liga: "https://www.olympus-tours.com/terms-conditions#privacy"
  }];

  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;

  private translate: TranslateService;

  constructor(translate: TranslateService,
              private DKP:DeviceKeyProvider,
              private iab: InAppBrowser) {
    this.translate = translate;

  }
  applyLanguage() {
    this.translate.use(this.selectedLanguage);
    if(this.selectedLanguage=="es"){this.DKP.keys.lang= 1;}
    if(this.selectedLanguage=="en"){this.DKP.keys.lang= 2;}
  }
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
