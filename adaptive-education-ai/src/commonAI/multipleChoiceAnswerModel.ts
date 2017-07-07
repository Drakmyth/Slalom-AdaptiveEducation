export default class MultipleChoiceModel {
    answerId: number;
    answerText: string;
    isAnswer: boolean;

    constructor(answerId: number, answerText: string, isAnswer: boolean) {
        this.answerId = answerId;
        this.answerText = answerText;
        this.isAnswer = isAnswer;
    }   
}