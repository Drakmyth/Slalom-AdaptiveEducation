'use strict';
import WatsonResultModel from '../ibm-watson/WatsonResultModel';
import SemanticRolesModel from '../ibm-watson/SemanticRolesModel';
import SaoTypeQuestionModel from '../ibm-watson/SaoTypeQuestionModel';
import MultipleChoiceModel from '../ibm-watson/MultipleChoiceModel';

const questionTypeId = 1;
const subjectQuestion = 'What is the subject of the following sentence?';
const actionQuestion = 'What is the action of the following sentence?';
const objectQuestion = 'What is the object of the following sentence?';

export class IbmWatsonNluService {
    watsonResults: WatsonResultModel[];

    constructor() {
        this.watsonResults = new Array();
    }

    getNumberOfWatsonInMemory() {
        return this.watsonResults.length;
    }

    setWatsonResult(watsonResult: any) {
        this.watsonResults.push(new WatsonResultModel(
            watsonResult.semantic_roles,
            watsonResult.language
        ));
    }

    getWatsonResult(key?: number) {
        if(!key) {
            return this.watsonResults;        
        }

        return this.watsonResults[key - 1];
    }

    getSemanticRolesResult(key: number) {
        return this.watsonResults[key - 1].semanticRoles;            
    }    

    generateSaoQuestions(key: number) {
        let questionId: number;
        let answerId:number;
        let semanticRoles: SemanticRolesModel[];

        questionId = 1;

        let saoTypeQuestions: SaoTypeQuestionModel[];
        saoTypeQuestions = new Array();

        semanticRoles = this.watsonResults[key - 1].semanticRoles;

        for (let semantic of semanticRoles) {
            answerId = 1;

            // generate subject question
            if (semantic.subject) {
                let choiceOptions = new Array();

                choiceOptions.push(
                    new MultipleChoiceModel(
                    answerId++,
                    semantic.subject.text,
                    true)
                );

                if (semantic.action) {
                    choiceOptions.push(
                        new MultipleChoiceModel(
                        answerId++,
                        semantic.action.text,
                        false)
                    );
                }

                if (semantic.object) {
                    choiceOptions.push(
                        new MultipleChoiceModel(
                        answerId,
                        semantic.object.text,
                        false)
                    );
                }                

                saoTypeQuestions.push(
                    new SaoTypeQuestionModel(
                        questionId++,
                        questionTypeId,
                        subjectQuestion,
                        semantic.sentence,
                        this.shuffleMultipleChoice(choiceOptions)
                    )
                );
            }

            // generate action question
            if (semantic.action) {
                let choiceOptions = new Array();

                choiceOptions.push(
                    new MultipleChoiceModel(
                    answerId++,
                    semantic.action.text,
                    true)
                );

                if (semantic.subject) {
                    choiceOptions.push(
                        new MultipleChoiceModel(
                        answerId++,
                        semantic.subject.text,
                        false)
                    );
                }

                if (semantic.object) {
                    choiceOptions.push(
                        new MultipleChoiceModel(
                        answerId,
                        semantic.object.text,
                        false)
                    );
                }                

                saoTypeQuestions.push(
                    new SaoTypeQuestionModel(
                        questionId++,
                        questionTypeId,
                        actionQuestion,
                        semantic.sentence,
                        this.shuffleMultipleChoice(choiceOptions)
                    )
                );
            }

            // generate object question
            if (semantic.object) {
                let choiceOptions = new Array();

                choiceOptions.push(
                    new MultipleChoiceModel(
                    answerId++,
                    semantic.object.text,
                    true)
                );

                if (semantic.subject) {
                    choiceOptions.push(
                        new MultipleChoiceModel(
                        answerId++,
                        semantic.subject.text,
                        false)
                    );
                }

                if (semantic.action) {
                    choiceOptions.push(
                        new MultipleChoiceModel(
                        answerId,
                        semantic.action.text,
                        false)
                    );
                }                

                saoTypeQuestions.push(
                    new SaoTypeQuestionModel(
                        questionId++,
                        questionTypeId,
                        objectQuestion,
                        semantic.sentence,
                        this.shuffleMultipleChoice(choiceOptions)
                    )
                );
            }            
        }

        return saoTypeQuestions;
    }

    private shuffleMultipleChoice(choices:any) {
        for (let i = choices.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [choices[i - 1], choices[j]] = [choices[j], choices[i - 1]];
        }

        return choices;
    }
}

export default IbmWatsonNluService;