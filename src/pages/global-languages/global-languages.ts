import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {availableLanguages, sysOptions} from "./global-languages.constants";
import {TranslateService} from "ng2-translate";

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

  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;

  param = { value: 'world' };

  private translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;

  }

  applyLanguage() {
    this.translate.use(this.selectedLanguage);
  }

}
