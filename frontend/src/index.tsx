import * as React from "react";
import * as ReactDOM from "react-dom";
import {MultipleChoiceQuestion} from "./components/multipleChoiceQuestion";
import {MockMultipleChoiceQuestionModels} from "./models/questionModel";


interface AppProps {
}

class App extends React.Component<AppProps, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            showFeedback: false
        };

    }

    getMultipleChoiceQuestions = (): any[] => {
        return MockMultipleChoiceQuestionModels.map((question, index) => {
            if(!this.state){
                return;
            }
            return (<li key={index}><MultipleChoiceQuestion question={question} showFeedback={this.state.showFeedback}></MultipleChoiceQuestion></li>);
        }, this);
    };

    submitQuestions = () => {
        this.setState({showFeedback: true});
    };

    render () {
        return (
            <div className="app">
                <header className="header-bar"></header>
                <section className="tab-view">
                    <div className="tab">
                        <div className="tab-header">Questions</div>
                        <div className="tab-body">
                            <div>{'<'} Back to Assignment List</div>
                            <form name="questionsForm" onSubmit={(e) => {e.preventDefault()}}>
                                <ol className="question-list">
                                    {this.getMultipleChoiceQuestions()}
                                </ol>
                                <button type="submit" className="yes-button" onClick={this.submitQuestions}>Submit</button>
                            </form>
                        </div>
                    </div>

                    <div className="tab">
                        <div id="uploadTabHeader" className="tab-header">Upload</div>
                        <div className="tab-body hide">
                            <form>
                                <label className="upload-label" htmlFor="upload-area"></label>
                                <textarea id="uploadArea" name="upload" className="upload-area" defaultValue="Paste text here."></textarea>
                                <button className="upload-button yes-button">Upload</button>
                            </form>
                        </div>
                    </div>

                </section>
            </div>
        );
    }

}


ReactDOM.render(
    <App />,
    document.getElementById("root")
);



