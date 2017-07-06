import * as React from "react";
import * as ReactDOM from "react-dom";
import {MultipleChoiceQuestion} from "./components/multipleChoiceQuestion";
import {MockMultipleChoiceQuestionModels} from "./models/questionModel";
import {Tab} from "./components/tab";
import {ReactNode} from "react";


interface AppProps {
}

class App extends React.Component<AppProps, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            showFeedback: false,
            activeTabIndex: 0
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

    getQuestionTab = (): ReactNode => {

        return (
            <div>
                <div>{'<'} Back to Assignment List</div>
                <form name="questionsForm" onSubmit={(e) => {e.preventDefault()}}>
                    <ol className="question-list">
                        {this.getMultipleChoiceQuestions()}
                    </ol>
                    <button type="submit" className="yes-button" onClick={this.submitQuestions}>Submit</button>
                </form>
            </div>
        );
    };

    getUploadTab = (): ReactNode => {
        return (
            <div>
                <form>
                    <label htmlFor="uploadName"><input id="uploadName" type="text" name="uploadName" /></label>
                    <label className="upload-label" htmlFor="upload-area"></label>
                    <textarea id="uploadArea" name="upload" className="upload-area" defaultValue="Paste text here."></textarea>
                    <button className="upload-button yes-button">Upload</button>
                </form>
            </div>
        );
    };

    submitQuestions = () => {
        this.setState({showFeedback: true});
    };

    selectTab = (selectedTabIndex: number) => {
        this.setState({
            activeTabIndex: selectedTabIndex
        });
    };

    render () {
        return (
            <div className="app">
                <header className="header-bar"></header>
                <section className="tab-view">
                    <Tab children={this.getUploadTab()} tabHeader="Upload" tabIndex={0} activeTabIndex={this.state.activeTabIndex} tabClickCallback={ this.selectTab }></Tab>
                    <Tab children={this.getQuestionTab()} tabHeader="Questions" tabIndex={1} activeTabIndex={this.state.activeTabIndex} tabClickCallback={ this.selectTab }></Tab>
                </section>
            </div>
        );
    }

}


ReactDOM.render(
    <App />,
    document.getElementById("root")
);



