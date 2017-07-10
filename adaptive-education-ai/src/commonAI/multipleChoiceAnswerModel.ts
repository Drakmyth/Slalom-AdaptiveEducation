export default class MultipleChoiceAnswerModel {
    answerId: number;
    answerText: string;
    isAnswer: boolean;

    constructor(answerId: number, answerText: string, isAnswer: boolean) {
        this.answerId = answerId;
        this.answerText = answerText;
        this.isAnswer = isAnswer;
    }   
}