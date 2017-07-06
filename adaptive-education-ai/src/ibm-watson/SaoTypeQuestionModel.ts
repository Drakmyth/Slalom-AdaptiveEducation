'use strict';

export class SaoTypeQuestionModel {
    sentence: string;
    question: string;
    answer: string;
    multipleChoice: any;

    constructor(sentence: string, question: string, answer: string, multipleChoice: any) {
        this.sentence = sentence;
        this.question = question;
        this.answer = answer;
        this.multipleChoice = multipleChoice;
    }   
}

export default SaoTypeQuestionModel;