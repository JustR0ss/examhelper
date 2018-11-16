import { Component, OnDestroy, AfterViewInit, DoCheck, IterableDiffers } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { QuestionService } from './question.service';
import { Question, ExamInfo } from '../../models/question.model';
import { Observable, Subscription } from 'rxjs';

import { ModalController, ViewController } from 'ionic-angular';

import * as $ from 'jquery'

@Component({
  selector: 'page-home',
  templateUrl: 'question.html'
})
export class QuestionPage implements OnDestroy, DoCheck , AfterViewInit{

  title = 'Question';
  questionNo = 1;
  currentQuestion: Question;
  examInfo = new ExamInfo();
  questionType: number;
  inputAnswers = [];
  radioAnswer: number;
  radioSelection = 'A';
  submitted = false;
  maxTime = 0;
  currentTime = 0;
  maxQuestions = null;
  timerWarning = true;
  loading = null;
  coverHeight = 0;
  collection: any;
  differ: any;

  questionDisplaySub: Subscription;
  questionExamInfoSub: Subscription;
  timer: Subscription;


  constructor(public navCtrl: NavController, private questionService: QuestionService
    , public navParams: NavParams, public modalCtrl: ModalController
  , public loadingCtrl: LoadingController, private differs: IterableDiffers) {
    this.presentLoadingDefault('Loading Question');
    this.questionExamInfoSub = questionService.getExamInfo().subscribe((data) => {
      if (data.examtime != 0) {
        this.examInfo = data;
        this.maxTime = data.examtime * 1000 * 60;
        this.currentTime = data.examtime * 1000 * 60;
        this.maxQuestions = data.noofquestions;
        this.startTimer();
      }
    });
    this.questionDisplaySub = questionService.displayQuestion().subscribe((result: Question) => {
      this.currentQuestion = result;
      this.inputAnswers = [];
      if (this.currentQuestion.answers) {
        if (this.loading != null) {
          this.loading.dismiss();
        }
        this.questionType = this.currentQuestion.questiontypeid;
        if (this.questionType === 1) {
          this.currentQuestion.answers.forEach(element => {
            this.inputAnswers.push(false);
          });
        } else if (this.questionType === 2) {
          this.radioAnswer = this.currentQuestion.answers.find(x => x.result).answerid;
        }
        
      }
    });
    questionService.getExam(navParams.get('examid'));
  }

  ngAfterViewInit() {
  }


  ngOnDestroy () {
    this.unsub();
  }

  ionViewWillLeave() {
    this.unsub();
  }

  unsub() {
    this.questionDisplaySub.unsubscribe();
    this.questionExamInfoSub.unsubscribe();
    this.timer.unsubscribe();
  }

  startTimer() {
    if(!this.timer) {
      this.timer = Observable.interval(1000)
      .subscribe((val) => { this.updateTimer(); });
      this.timerWarning = false;
    }
  }

  public submit() {
    this.submitted = true;
  }

  begin() {
    this.questionNo--;
  }

  previous() {
    this.submitted = false;
    this.questionNo--;
    this.questionService.previousQuestion();
  }

  public next() {
    this.presentLoadingDefault('Loading Question');
    this.submitted = false;
    this.questionNo++;
    this.questionService.nextQuestion();
  }

  finish () {

  }

  updateTimer() {
    
    this.currentTime = this.currentTime - 1000;
    if (!this.timerWarning && (this.currentTime < (this.maxTime*.1))) {
      this.timerWarning = true;
    }
    if (this.currentTime <= 0) {
      this.timer.unsubscribe();
    }

  }

  presentLoadingDefault(text) {

    this.loading = this.loadingCtrl.create({
      content: text
    });
  
    this.loading.present();
  }

}