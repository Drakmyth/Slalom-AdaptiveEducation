'use strict';
import SemanticRolesModel from '../ibm-watson/SemanticRolesModel';
import SaoTypeQuestionModel from '../ibm-watson/SaoTypeQuestionModel';

export class IbmWatsonNluService {
    watsonResult: any;
    semanticRoles: SemanticRolesModel[];

    setWatsonResult(watsonResult: any) {
        this.watsonResult = watsonResult;
        this.semanticRoles = this.watsonResult.semantic_roles;
    }

    getWatsonResult() {
        return this.watsonResult;            
    }

    getSemanticRolesResult() {
        return this.semanticRoles;            
    }    

    generateSaoQuestions() {
        let saoTypeQuestions: SaoTypeQuestionModel[];
        saoTypeQuestions = new Array();

        for (let semantic of this.semanticRoles) {
            // generate subject question
            if (semantic.subject) {
                let choiceOptions = new Array();
                choiceOptions.push(semantic.subject.text);

                if (semantic.action) {
                    choiceOptions.push(semantic.action.text);
                }

                if (semantic.object) {
                    choiceOptions.push(semantic.object.text);
                }                

                saoTypeQuestions.push(
                    new SaoTypeQuestionModel(
                        semantic.sentence,
                        'What is the subject of this sentence: ' + semantic.sentence,
                        semantic.subject.text,
                        this.shuffleMultipleChoice(choiceOptions)
                    )
                );
            }

            // generate action question
            if (semantic.action) {
                let choiceOptions = new Array();
                choiceOptions.push(semantic.action.text);

                if (semantic.subject) {
                    choiceOptions.push(semantic.subject.text);
                }

                if (semantic.object) {
                    choiceOptions.push(semantic.object.text);
                }                

                saoTypeQuestions.push(
                    new SaoTypeQuestionModel(
                        semantic.sentence,
                        'What is the action of this sentence: ' + semantic.sentence,
                        semantic.action.text,
                        this.shuffleMultipleChoice(choiceOptions)
                    )
                );
            }

            // generate object question
            if (semantic.object) {
                let choiceOptions = new Array();
                choiceOptions.push(semantic.object.text);

                if (semantic.subject) {
                    choiceOptions.push(semantic.subject.text);
                }     

                if (semantic.action) {
                    choiceOptions.push(semantic.action.text);
                }           

                saoTypeQuestions.push(
                    new SaoTypeQuestionModel(
                        semantic.sentence,
                        'What is the object of this sentence: ' + semantic.sentence,
                        semantic.object.text,
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