'use strict';
import MultipleChoiceModel from '../ibm-watson/MultipleChoiceModel';

export default class SaoTypeQuestionModel {
    questionId: number;
    questionTypeId: number;
    questionTypeText: string;
    questionText: string;
    answers: MultipleChoiceModel[];

    constructor(
        questionId: number, 
        questionTypeId: number, 
        questionTypeText: string, 
        questionText: string,
        answers: MultipleChoiceModel[]) {
        this.questionId = questionId;
        this.questionTypeId = questionTypeId;
        this.questionTypeText = questionTypeText;
        this.questionText = questionText;
        this.answers = answers;
    }   
}