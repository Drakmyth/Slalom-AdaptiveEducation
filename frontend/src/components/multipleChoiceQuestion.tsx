import * as React from 'react';

import { MultipleChoiceAnswer } from "./multipleChoiceAnswer";

interface MultipleChoiceQuestionProps {

}

class MultipleChoiceQuestion extends React.Component<MultipleChoiceQuestionProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="multiple-choice-question">
                <p className="question-text-multiple">What is the question text?</p>
                <ul className="multiple-choice-answer-list">
                    <li>
                       <MultipleChoiceAnswer></MultipleChoiceAnswer>
                    </li>
                    <li>
                        <MultipleChoiceAnswer></MultipleChoiceAnswer>
                    </li>
                    <li>
                        <MultipleChoiceAnswer></MultipleChoiceAnswer>
                    </li>
                    <li>
                        <MultipleChoiceAnswer></MultipleChoiceAnswer>
                    </li>
                </ul>
            </div>
        );
    }
}

export {MultipleChoiceQuestion};