import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';

import { QuestionPage } from './../question/question'
import { SettingsPage } from './../settings/settings'
import { ExpandableComponent } from './../../components/expandable/expandable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any = [];
  itemExpandHeight: number = 70;
  language ='';

  constructor(public navCtrl: NavController, public platform: Platform,
    private translate: TranslateService) {

      this.items = [
        {id:2, name: 'EXAM.70486',expanded: false}
    ];
    this.language = translate.getDefaultLang();
  }

  languageChanged(event) {
    this.translate.use(event);
  }
  
  begin(examid) {
    this.navCtrl.push(QuestionPage,{"examid":examid});
  }

  format(examId) {

  }

  changes(examId) {

  }

  resources(examId) {

  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  exit() {
    this.platform.exitApp();
  }

  expandItem(item){
 
    this.items.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

  }
}