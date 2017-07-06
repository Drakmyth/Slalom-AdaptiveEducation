import * as React from 'react';
import {MultipleChoiceAnswerModel} from "../models/answerModel";
import {ChangeEventHandler} from "react";

interface MultipleChoiceAnswerProps {
    questionId: number;
    answer: MultipleChoiceAnswerModel;
    selectedAnswerId: number;
    showFeedback: boolean;
    handleOnChangeAnswer: ChangeEventHandler<HTMLInputElement>;
}

class MultipleChoiceAnswer extends React.Component<MultipleChoiceAnswerProps, any> {

    constructor(props: any) {
        super(props);
    }

    getAnswerFeedback = () => {
        return this.props.answer.isAnswer ?
            <span className="answer-feedback correct">O</span>
            :
            <span className="answer-feedback incorrect">X</span>;
    };

    render() {
        return (
            <div className="multiple-choice-answer">
                {this.props.showFeedback && (this.props.selectedAnswerId == this.props.answer.answerId || this.props.answer.isAnswer) ? this.getAnswerFeedback() : ''}
                <label className="answer-label-radio">
                    <input type="radio" name={'question_' + this.props.questionId}
                           className="answer-input-radio" onChange ={ this.props.handleOnChangeAnswer }
                           checked={this.props.selectedAnswerId == this.props.answer.answerId}
                           value={this.props.answer.answerId}
                           disabled={this.props.showFeedback} />
                    {this.props.answer.answerText}
                </label>
            </div>
        );
    }
}

export {MultipleChoiceAnswer};