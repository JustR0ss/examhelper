import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  language =''
  constructor(public navCtrl: NavController, public platform: Platform,
    private translate: TranslateService) {
    this.language = translate.getDefaultLang();
  }

  languageChanged(event) {
    this.translate.setDefaultLang(event);
    this.translate.use(event);
  }
  
}