import * as React from 'react';
import {ChangeEvent} from "react";

interface UploadProps {
    pollQuestionsCallback: Function
}

class Upload extends React.Component<UploadProps, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            uploadText: ''
        }
    }

    onSubmitHandler = () => {
        //api call
        let analyzeTextAddress: string = 'http://localhost:3000/api/analyze-text';
        let requestData = { text: this.state.uploadText };

        fetch(analyzeTextAddress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(requestData)
        }).then((response) => {
            let jsonResponse = response.json();
            jsonResponse.then((analyzeTextResponse) => {
                this.props.pollQuestionsCallback(analyzeTextResponse.id);
            });

        }).catch((errResponse) => {
            console.log(errResponse);
        });
    };


    handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            uploadText: e.target.value
        });
    };

    render() {
        return (
            <form id="uploadForm" onSubmit={ (e) => {e.preventDefault(); this.onSubmitHandler(); }}>
                <div className="upload-method-container">
                    <button>Custom Entry</button>
                    <button disabled={true}>File Upload</button>
                    <button disabled={true}>Photo Upload</button>
                </div>
                <label htmlFor="uploadName" className="upload-name-label">Upload Name<input id="uploadName" className="upload-name" type="text" name="uploadName" /></label>
                <div className="upload-area-container">
                    <label className="upload-label" htmlFor="upload-area"></label>
                    <textarea id="uploadArea" name="upload" className="upload-area" onChange={ this.handleTextAreaChange } placeholder="Paste text here."></textarea>
                </div>
                <button type="submit" className="upload-button yes-button">Upload</button>
            </form>
        );
    }
}

export {Upload};