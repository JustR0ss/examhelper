export class Answer {
    answerid:number;
    text: string;
    result: boolean;
}
export class Question {
    questionid: number;
    sectionid: number;
    question: string;
    questiontypeid: number;
    answers: Array<Answer>
    answered: any;
}
export class Exam {
    examid:number;
    examname: string;
    examtime: number;
    noofquestions: string;
    questions: Array<Question>;
}

export class ExamInfo{
    examname = '';
    examtime = 0;
    noofquestions = null;
}

export class Exams{
    exams: Array<Exam>;
}