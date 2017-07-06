import * as React from 'react';

class MultipleChoiceAnswer extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="multiple-choice-answer">
                <label className="answer-label-radio"><input type="radio" name="questionOne" className="answer-input-radio" /> Answer 1</label>
            </div>
        );
    }
}

export {MultipleChoiceAnswer};