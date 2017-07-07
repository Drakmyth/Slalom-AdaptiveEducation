import * as React from "react";
import * as ReactDOM from "react-dom";
import {MultipleChoiceQuestion} from "./components/multipleChoiceQuestion";
import {MultipleChoiceQuestionModel} from "./models/questionModel";
import {Tab} from "./components/tab";
import {ReactNode} from "react";
import {Upload} from "./components/upload";
import {IApiStatusResponseWrapper} from "./models/apiStatusResponseWrapper";


interface AppProps {
}

class App extends React.Component<AppProps, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            showFeedback: false,
            activeTabIndex: 0,
            multipleChoiceQuestions: []
        };

    }

    getMultipleChoiceQuestions = (multipleChoiceQuestionModels: MultipleChoiceQuestionModel[]): any[] => {
        if(!multipleChoiceQuestionModels) {
            multipleChoiceQuestionModels = [];
        }

        return multipleChoiceQuestionModels.map((question, index) => {
            if(!this.state){
                return;
            }
            return (<li key={index}><MultipleChoiceQuestion question={question} showFeedback={this.state.showFeedback}></MultipleChoiceQuestion></li>);
        }, this);
    };

    getQuestionTab = (multipleChoiceQuestionModels: MultipleChoiceQuestionModel[]): ReactNode => {

        return (
            <div>
                <form name="questionsForm" onSubmit={(e) => {e.preventDefault()}}>
                    <ol className="question-list">
                        {this.getMultipleChoiceQuestions(multipleChoiceQuestionModels)}
                    </ol>
                    <button type="submit" className="yes-button" onClick={this.submitQuestions}>Submit</button>
                </form>
            </div>
        );
    };

    getUploadTab = (): ReactNode => {
        return (
            <div>
                <Upload pollQuestionsCallback={this.pollQuestionsCallback}></Upload>
            </div>
        );
    };

    pollQuestionsCallback = (textAnalysisId: number) => {
        let saoQuestionsAddress: string = 'http://localhost:3000/api/get-questions/' + textAnalysisId;
        fetch(saoQuestionsAddress,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {

            let responseJson = response.json();

            let retryCount: number = 0;

            responseJson.then((questionResponse: MultipleChoiceQuestionModel[]) => {
                if (questionResponse && questionResponse.length > 0) {
                    this.setState({
                        activeTabIndex: 1,
                        multipleChoiceQuestions: questionResponse,
                        showFeedback: false
                    });
                } else if (retryCount < 5){
                    setTimeout(() => {
                        retryCount ++;
                        this.pollQuestionsCallback(textAnalysisId);
                    }, 5000);
                } else if (retryCount === 5) {
                    retryCount = 6;
                    alert('Request has timed out.');
                }
            });
        }).catch((errResponse) => {
            console.log(errResponse);
        });
    };


    submitQuestions = () => {
        this.setState({showFeedback: true});
    };

    selectTab = (selectedTabIndex: number) => {
        if (!this.state || !this.state.multipleChoiceQuestions || this.state.multipleChoiceQuestions.length < 1 && selectedTabIndex == 1){
            return; // disallow navigation to question tab if there are no questions available.
        }
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
                    <Tab children={this.getQuestionTab(this.state.multipleChoiceQuestions)} tabHeader="Questions" tabIndex={1} activeTabIndex={this.state.activeTabIndex} tabClickCallback={ this.selectTab }></Tab>
                </section>
            </div>
        );
    }

}


ReactDOM.render(
    <App />,
    document.getElementById("root")
);



