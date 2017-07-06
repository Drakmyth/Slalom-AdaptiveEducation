import {IAnswerModel, MultipleChoiceAnswerModel, MockMultipleChoiceAnswerModels} from "./answerModel";

export interface IQuestionModel {
    questionId: number;
    questionTypeId: number;
    questionTypeText: string;
    questionText: string;
    answers: IAnswerModel[];
}

export class MultipleChoiceQuestionModel implements IQuestionModel {
    questionId: number;
    questionTypeId: number;
    questionTypeText: string;
    questionText: string;
    answers: MultipleChoiceAnswerModel[];
}


export const MockMultipleChoiceQuestionModels: MultipleChoiceQuestionModel[] = [
    {
        questionId: 1,
        questionTypeId: 1,
        questionTypeText: 'What is the subject of the following sentence?',
        questionText: 'This sentence has a subject in it.',
        answers: MockMultipleChoiceAnswerModels
    } as MultipleChoiceQuestionModel,
    {
        questionId: 2,
        questionTypeId: 1,
        questionTypeText: 'What is the subject of the following sentence?',
        questionText: 'This sentence also ahs a subject in it.',
        answers: MockMultipleChoiceAnswerModels
    } as MultipleChoiceQuestionModel,
    {
        questionId: 3,
        questionTypeId: 2,
        questionTypeText: 'What is the action in the following sentence?',
        questionText: 'I wrote this sentence.',
        answers: MockMultipleChoiceAnswerModels
    } as MultipleChoiceQuestionModel,
    {
        questionId: 4,
        questionTypeId: 1,
        questionTypeText: 'What is the object of the following sentence?',
        questionText: 'You read this sentence.',
        answers: MockMultipleChoiceAnswerModels
    } as MultipleChoiceQuestionModel
];
