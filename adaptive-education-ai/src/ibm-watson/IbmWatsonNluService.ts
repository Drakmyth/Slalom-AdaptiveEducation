'use strict';
import WatsonResultModel from '../ibm-watson/WatsonResultModel';
import SemanticRolesModel from '../ibm-watson/SemanticRolesModel';
import MultipleChoiceQuestionModel from '../commonAI/multipleChoiceQuestionModel';
import MultipleChoiceAnswerModel from '../commonAI/MultipleChoiceAnswerModel';
import {TextAnalyses} from "../commonAI/textAnalyses";
import TextAnalysisModel from "../commonAI/textAnalysisModel";

const questionTypeId = 1;
const subjectQuestion = 'What is the subject of the following sentence?';
const actionQuestion = 'What is the action of the following sentence?';
const objectQuestion = 'What is the object of the following sentence?';

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

export class IbmWatsonNluService {

    constructor() {

    }

    analyzeText = (text: string, index: number) => {

        let watsonResultString: string;

        // setting up natural language understanding
        let nlu = new NaturalLanguageUnderstandingV1({
            username: 'af6311ab-9757-48bc-8e4f-7598198ce369',
            password: '2fcJVuiSI45V',
            version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
        });

        // analyze Text
        nlu.analyze({
            'html': text, // Buffer or String
            'features': {
                'semantic_roles': {}
            }
        }, (err, response) => {
            if (err) {
                console.log('error:', err);
            }
            else {
                // do we need to stringify and then parse?
                watsonResultString = JSON.stringify(response);

                this.setResult(JSON.parse(watsonResultString), index);
            }
        });
    };

    setResult = (watsonResult: WatsonResultModel, index: number) => {

        if (!TextAnalyses[index]) {
            return; // should be an error case, really
        }

        TextAnalyses[index].watsonResult = watsonResult;

        if (TextAnalyses[index].azureLinguisticsResult) {
            console.log(index + ' is finished');
            TextAnalyses[index].isFinished = true;
        }
    };

    generateMultipleChoiceQuestions = (textAnalysis: TextAnalysisModel, nextQuestionId: number) => {
        let questionId: number;
        let answerId:number;
        let semanticRoles: SemanticRolesModel[];

        questionId = nextQuestionId;

        let saoTypeQuestions: MultipleChoiceQuestionModel[];
        saoTypeQuestions = [];


        let watsonResult: WatsonResultModel = textAnalysis.watsonResult;
        semanticRoles = watsonResult.semanticRoles || watsonResult['semantic_roles'];

        for (let semantic of semanticRoles) {
            answerId = 1;

            // generate subject question
            if (semantic.subject) {
                let choiceOptions = [];

                choiceOptions.push(
                    new MultipleChoiceAnswerModel(
                    answerId++,
                    semantic.subject.text,
                    true)
                );

                if (semantic.action) {
                    choiceOptions.push(
                        new MultipleChoiceAnswerModel(
                        answerId++,
                        semantic.action.text,
                        false)
                    );
                }

                if (semantic.object) {
                    choiceOptions.push(
                        new MultipleChoiceAnswerModel(
                        answerId,
                        semantic.object.text,
                        false)
                    );
                }                

                saoTypeQuestions.push(
                    new MultipleChoiceQuestionModel(
                        questionId++,
                        questionTypeId,
                        subjectQuestion,
                        semantic.sentence,
                        this.shuffleMultipleChoiceAnswers(choiceOptions)
                    )
                );
            }

            // generate action question
            if (semantic.action) {
                let choiceOptions = [];

                choiceOptions.push(
                    new MultipleChoiceAnswerModel(
                    answerId++,
                    semantic.action.text,
                    true)
                );

                if (semantic.subject) {
                    choiceOptions.push(
                        new MultipleChoiceAnswerModel(
                        answerId++,
                        semantic.subject.text,
                        false)
                    );
                }

                if (semantic.object) {
                    choiceOptions.push(
                        new MultipleChoiceAnswerModel(
                        answerId,
                        semantic.object.text,
                        false)
                    );
                }                

                saoTypeQuestions.push(
                    new MultipleChoiceQuestionModel(
                        questionId++,
                        questionTypeId,
                        actionQuestion,
                        semantic.sentence,
                        this.shuffleMultipleChoiceAnswers(choiceOptions)
                    )
                );
            }

            // generate object question
            if (semantic.object) {
                let choiceOptions = [];

                choiceOptions.push(
                    new MultipleChoiceAnswerModel(
                    answerId++,
                    semantic.object.text,
                    true)
                );

                if (semantic.subject) {
                    choiceOptions.push(
                        new MultipleChoiceAnswerModel(
                        answerId++,
                        semantic.subject.text,
                        false)
                    );
                }

                if (semantic.action) {
                    choiceOptions.push(
                        new MultipleChoiceAnswerModel(
                        answerId,
                        semantic.action.text,
                        false)
                    );
                }                

                saoTypeQuestions.push(
                    new MultipleChoiceQuestionModel(
                        questionId++,
                        questionTypeId,
                        objectQuestion,
                        semantic.sentence,
                        this.shuffleMultipleChoiceAnswers(choiceOptions)
                    )
                );
            }            
        }

        return saoTypeQuestions;
    };

    shuffleMultipleChoiceAnswers = (choices:MultipleChoiceAnswerModel[]) => {
        for (let i = choices.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [choices[i - 1], choices[j]] = [choices[j], choices[i - 1]];
        }

        return choices;
    };
}
