import { NgModule } from '@angular/core';
import {IonicModule, Platform} from 'ionic-angular';
import { GlobalLanguagesPage } from './global-languages';
import {TranslateModule, TranslateService} from "ng2-translate";
import {Globalization} from "@ionic-native/globalization";
import {defaultLanguage, sysOptions, availableLanguages} from "./global-languages.constants";
import {Storage} from "@ionic/storage";

@NgModule({
  imports: [IonicModule, TranslateModule],
  declarations: [GlobalLanguagesPage],
  entryComponents: [GlobalLanguagesPage]
})
export class GlobalLanguagesPageModule {
  constructor(private platform: Platform, private translate: TranslateService, private globalization: Globalization, private storage: Storage) {
    platform.ready().then(() => {
      // try to get saved language
      this.setLanguage();
      }
    );
  }


  getSuitableLanguage(language) {
    language = language.substring(0, 2).toLowerCase();
    return availableLanguages.some(x => x.code == language) ? language : defaultLanguage;
  }


  setLanguage(){
    if(this.platform.is('cordova')){
    this.storage.get('lenguaje').then(done => {
      if(done) {
        if ((<any>window).cordova) {
          this.translate.use(done);
          console.log("Esto es lo que tenia guardado como idioma...." + done);
        }
      }else if(!done){
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(defaultLanguage);

        if ((<any>window).cordova) {
          this.globalization.getPreferredLanguage().then(result => {
            var language = this.getSuitableLanguage(result.value);
            this.translate.use(language);
            sysOptions.systemLanguage = language;
            this.storage.set('lenguaje', language);
          });
        }
      }
    });
    }else {
      let browserLanguage = this.translate.getBrowserLang() || defaultLanguage;
      var language = this.getSuitableLanguage(browserLanguage);
      this.translate.use(language);
      sysOptions.systemLanguage = language;
      this.storage.set('lenguaje', language);
    }

  }
}
