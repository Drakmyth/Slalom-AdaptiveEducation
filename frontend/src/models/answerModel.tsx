export interface IAnswerModel {
    answerId: number;
    answerText: string;
    isAnswer: boolean;
}

export class MultipleChoiceAnswerModel implements IAnswerModel {
    answerId: number;
    answerText: string;
    isAnswer: boolean;
}

export const MockMultipleChoiceAnswerModels: MultipleChoiceAnswerModel[] = [
    {
        answerId: 1,
        answerText: 'Answer 1',
        isAnswer: false
    } as MultipleChoiceAnswerModel,
    {
        answerId: 2,
        answerText: 'Answer 2',
        isAnswer: true
    } as MultipleChoiceAnswerModel,
    {
        answerId: 3,
        answerText: 'Answer 3',
        isAnswer: false
    } as MultipleChoiceAnswerModel,
    {
        answerId: 4,
        answerText: 'Answer 4',
        isAnswer: false
    } as MultipleChoiceAnswerModel
];
