import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { Question, Exams, ExamInfo } from '../../models/question.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {

  private quesionIndex = 0;
  examQuestions: any;
  currentQuestion = new BehaviorSubject<Question>(new Question);
  examInfo = new BehaviorSubject<ExamInfo>(new ExamInfo);

  constructor(private http: HttpClient){

  }

  getExam(examid): void {
    this.http.get("../../../assets/questions.json").subscribe(data => {
      const convertedData = data as Exams;
      var result = convertedData.exams.filter(obj => {
        return obj.examid === examid
      })
      this.examQuestions = result;
      const currentExamInfo = new ExamInfo();
      currentExamInfo.examname = result[0].examname; 
      currentExamInfo.examtime = result[0].examtime;
      currentExamInfo.noofquestions = result[0].noofquestions;
      this.examInfo.next(currentExamInfo);
      this.currentQuestion.next(result[0].questions[this.quesionIndex]);
    });
  }

  displayQuestion(): Observable<Question> {
    return this.currentQuestion;
  }

  getExamInfo(): Observable<ExamInfo> {
    return this.examInfo;
  }

  nextQuestion() {
    this.quesionIndex++;
    this.currentQuestion.next(this.examQuestions[0].questions[this.quesionIndex]);
  }

  previousQuestion() {
    this.quesionIndex--;
    this.currentQuestion.next(this.examQuestions[0].questions[this.quesionIndex]);
  }
}