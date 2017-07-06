import * as React from "react";
import * as ReactDOM from "react-dom";
import {MultipleChoiceQuestion} from "./components/multipleChoiceQuestion";

ReactDOM.render(
    <div className="app">
        <header className="header-bar"></header>
        <section className="tab-view">
            <div className="tab">
                <div className="tab-header">Questions</div>
                <div className="tab-body">
                    <div>&lt; Back to Assignment List</div>
                    <ol className="question-list">
                        <li>
                            <MultipleChoiceQuestion></MultipleChoiceQuestion>
                        </li>
                    </ol>
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
    </div>,
    document.getElementById("root")
);
