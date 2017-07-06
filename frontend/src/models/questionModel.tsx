import {IAnswerModel, MultipleChoiceAnswerModel} from "./answerModel";

export interface IQuestion {
    QuestionId: number;
    QuestionTypeId: number;
    QuestionTypeText: string;
    QuestionText: number;
    Answers: IAnswerModel[];
}

export class MultipleChoiceQuestion implements IQuestion {
    QuestionId: number;
    QuestionTypeId: number;
    QuestionTypeText: string;
    QuestionText: number;
    Answers: MultipleChoiceAnswerModel[];
}
