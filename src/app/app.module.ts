import { NgModule, ErrorHandler } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from './pages/home/home';
import { QuestionPage } from './pages/question/question';
import { SettingsPage } from './pages/settings/settings';

import { ExpandableComponent } from './components/expandable/expandable';
import { DragAndDropComponent } from './components/draganddrop/draganddrop';

import { Tohhmmss } from './pipes/tohhmmss.pipe';

import { BrowserModule } from '@angular/platform-browser';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuestionService } from './pages/question/question.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestionPage,
    SettingsPage,
    ExpandableComponent,
    DragAndDropComponent,
    Tohhmmss
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuestionPage,
    SettingsPage,
    ExpandableComponent
  ],
  providers: [
    QuestionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
