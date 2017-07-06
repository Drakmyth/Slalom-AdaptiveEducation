export interface IAnswerModel {
    AnswerId: number;
    AnswerText: number;
    IsAnswer: boolean;
}

export class MultipleChoiceAnswerModel implements IAnswerModel {
    AnswerId: number;
    AnswerText: number;
    IsAnswer: boolean;
}
