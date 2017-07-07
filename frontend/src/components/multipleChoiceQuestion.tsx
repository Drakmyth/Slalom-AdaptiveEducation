import * as React from 'react';

import { MultipleChoiceAnswer } from "./multipleChoiceAnswer";
import {MultipleChoiceQuestionModel} from "../models/questionModel";
import {MultipleChoiceAnswerModel} from "../models/answerModel";
import {ChangeEvent} from "react";

interface MultipleChoiceQuestionProps {
    question: MultipleChoiceQuestionModel;
    showFeedback: boolean;
}

class MultipleChoiceQuestion extends React.Component<MultipleChoiceQuestionProps, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            selectedAnswerId: -1
        };

    }

    componentWillReceiveProps(nextProps: MultipleChoiceQuestionProps) {
        this.setState({
            selectedAnswerId: -1
        });
    }

    getMultipleChoiceAnswers = (): any[] => {
        let answers: MultipleChoiceAnswerModel[] = [];
        if (this.props.question && this.props.question.answers) {
            answers = this.props.question.answers;
        }

        return answers.map((answer: MultipleChoiceAnswerModel, index: number) => {
            return (
                <li key={index}><MultipleChoiceAnswer questionId={this.props.question.questionId} answer={answer} showFeedback={this.props.showFeedback} selectedAnswerId={this.state.selectedAnswerId} handleOnChangeAnswer={this.handleOnChangeAnswer}></MultipleChoiceAnswer></li>
            );
        });
    };

    handleOnChangeAnswer = (changeEvent: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            selectedAnswerId: changeEvent.target.value
        })
    };

    render() {
        return (
            <div className="multiple-choice-question">
                <p className="question-type-text">{this.props.question.questionTypeText}</p>
                <p className="question-text">"{this.props.question.questionText}"</p>
                <ul className="multiple-choice-answer-list">
                    {this.getMultipleChoiceAnswers()}
                </ul>
            </div>
        );
    }
}

export {MultipleChoiceQuestion};