import MultipleChoiceAnswerModel from "./multipleChoiceAnswerModel";

export default class MultipleChoiceQuestionModel {
    questionId: number;
    questionTypeId: number;
    questionTypeText: string;
    questionText: string;
    answers: MultipleChoiceAnswerModel[];

    constructor(
        questionId: number, 
        questionTypeId: number, 
        questionTypeText: string, 
        questionText: string,
        answers: MultipleChoiceAnswerModel[]) {
        this.questionId = questionId;
        this.questionTypeId = questionTypeId;
        this.questionTypeText = questionTypeText;
        this.questionText = questionText;
        this.answers = answers;
    }   
}