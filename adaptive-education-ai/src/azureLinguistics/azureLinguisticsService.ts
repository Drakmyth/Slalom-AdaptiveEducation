import MultipleChoiceQuestionModel from '../commonAI/multipleChoiceQuestionModel';
import MultipleChoiceAnswerModel from '../commonAI/multipleChoiceAnswerModel';
import {
    AzureLinguisticsConstituencyOutputModel, AzureLinguisticsSentenceTokenResultModel, AzureLinguisticsTagOutputModel,
    AzureLinguisticsTokenOutputModel, IAzureLinguisticsOutputModel
} from "./azureLinguisticsOutputModel";
import {TextAnalyses} from "../commonAI/textAnalyses";
import {AzureLinguisticsInputModel} from "./azureLinguisticsInputModel";
import {IRequestOptions, IRestResponse, RestClient} from "typed-rest-client/RestClient";
import {IHeaders} from "typed-rest-client/Interfaces";
import {AzureLinguisticsAnalyzers} from "./azureLinguisticsAnalyzers";
import TextAnalysisModel from "../commonAI/textAnalysisModel";

const questionTypeId = 1;
const linguisticsAnalysisUrl: string = 'https://westus.api.cognitive.microsoft.com/linguistics/v1.0/analyze';
const linguisticsAnalysisKey: string = 'dd6698bc8b8543068050ed9b06719bbc';
const partOfSpeechCodeMap = {
    IN: {simple:'preposition', specific:'preposition or subordinating conjunction'},
    JJ: {simple:'adjective', specific:'adjective or numeral order'},
    JJR: {simple:'adjective', specific:'adjective, comparable'},
    JJS: {simple:'adjective', specific:'adjective, superlative'},
    NN: {simple:'noun', specific:'singular noun'},
    NNS: {simple:'noun', specific:'plural noun'},
    NNP: {simple:'proper noun', specific:'proper noun'},
    NNPS: {simple:'proper noun', specific:'plural proper noun'},
    PRP: {simple:'pronoun', specific:'personal pronoun'},
    PRP$: {simple:'pronoun', specific:'posessive pronoun'},
    RB: {simple:'adverb', specific:'adverb'},
    RBR: {simple:'adverb', specific:'adverb, comparable'},
    RBS: {simple:'adverb', specific:'adverb, superlative'},
    VB: {simple:'verb', specific:'verb base form'},
    VBD: {simple:'verb', specific:'verb past tense'},
    VBG: {simple:'verb', specific:'verb present participle or gerund'},
    VBN: {simple:'verb', specific:'verb past participle'},
    VBP: {simple:'verb', specific:'verb present tense, not 3rd person singular'},
    VBZ: {simple:'verb', specific:'verb present tense, 3rd person singular'},
};

const partOfSpeechCodeClassificaions = {
    adjectives: ['JJ', 'JJR', 'JJS'],
    adverbs: ['RB', 'RBR', 'RBS'],
    commonNouns: ['NN', 'NNS'],
    prepositions: ['IN'],
    pronouns: ['PRP', 'PRP$'],
    properNouns: ['NNP', 'NNPS'],
    verbs: ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
};


export class AzureLinguisticsService {

    analyzeText = (text: string, index: number) => {
        let azureLinguisticsResponse: IAzureLinguisticsOutputModel[] = [];


        let restCli: RestClient = new RestClient('Metis Api', linguisticsAnalysisUrl, );

        let linguisticsAnalysisInput: AzureLinguisticsInputModel = new AzureLinguisticsInputModel(text);

        let requestHeaders: IHeaders = {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': linguisticsAnalysisKey};

        let requestOptions: IRequestOptions = {additionalHeaders: requestHeaders};

        restCli.create(linguisticsAnalysisUrl, linguisticsAnalysisInput, requestOptions).then((response: IRestResponse<IAzureLinguisticsOutputModel[]>) => {
            azureLinguisticsResponse = response.result;
            this.setResult(azureLinguisticsResponse, index);
        });

    };

    setResult = (azureLinguisticsResult: IAzureLinguisticsOutputModel[], index: number) => {
        if (!TextAnalyses[index]) {
            return; // should be an error case, really
        }

        TextAnalyses[index].azureLinguisticsResult = azureLinguisticsResult;

        if (TextAnalyses[index].watsonResult) {
            console.log(index + ' is finished');
            TextAnalyses[index].isFinished = true;
        }
    };

    generateMultipleChoiceQuestions = (textAnalysis: TextAnalysisModel, nextQuestionId: number) => {
        let azureLinguisticsOutput:IAzureLinguisticsOutputModel[] = textAnalysis.azureLinguisticsResult;
        let tagOutput: AzureLinguisticsTagOutputModel;
        let constituencyOutput: AzureLinguisticsConstituencyOutputModel;
        let tokenOutput: AzureLinguisticsTokenOutputModel;

        for (let i = 0; i < azureLinguisticsOutput.length; i ++) {
            let outputResult = azureLinguisticsOutput[i];

            switch (outputResult.analyzerId) {
                case AzureLinguisticsAnalyzers.tagAnalyzer:
                    tagOutput = outputResult;
                    break;
                case AzureLinguisticsAnalyzers.constituencyAnalyzer:
                    constituencyOutput = outputResult;
                    break;
                case AzureLinguisticsAnalyzers.tokenAnalyzer:
                    tokenOutput = outputResult;
                    break;
                default:
                    break;
            }
        }

        return this.generatePartOfSpeechQuestions(tagOutput, tokenOutput, nextQuestionId, textAnalysis.text);
    };

    generatePartOfSpeechQuestions = (tagOutput: AzureLinguisticsTagOutputModel, tokenOutput: AzureLinguisticsTokenOutputModel, nextQuestionId: number, text: string) : MultipleChoiceQuestionModel[] => {
        let partOfSpeechQuestions: MultipleChoiceQuestionModel[] = [];

        for(let sentenceIndex = 0; sentenceIndex < tagOutput.result.length; sentenceIndex ++){

            let sentenceTags:string[] = tagOutput.result[sentenceIndex];
            let sentenceDetails: AzureLinguisticsSentenceTokenResultModel = tokenOutput.result[sentenceIndex];

            let correctAnswer: MultipleChoiceAnswerModel;
            let correctAnswerPartOfSpeech;
            let wrongAnswers: MultipleChoiceAnswerModel[] = [];
            for(let tokenIndex = 0; tokenIndex < tagOutput.result[sentenceIndex].length; tokenIndex ++){
                let tokenTag: string = sentenceTags[tokenIndex];
                let rawToken: string = sentenceDetails.Tokens[tokenIndex].RawToken;

                let mappedTokenTag = partOfSpeechCodeMap[tokenTag];

                if (mappedTokenTag) {
                    if(!correctAnswer) {
                        correctAnswer = new MultipleChoiceAnswerModel(0, rawToken, true);
                        correctAnswerPartOfSpeech = mappedTokenTag.simple;
                    } else if (mappedTokenTag.simple !== correctAnswerPartOfSpeech) {
                        wrongAnswers.push(new MultipleChoiceAnswerModel(wrongAnswers.length + 1, rawToken, false))
                    }

                    if (wrongAnswers.length === 3) {
                        let partOfSpeech = correctAnswerPartOfSpeech;
                        let questionTypeText = 'Select a ' + partOfSpeech + ' from the following sentence:';
                        let questionText = text.substr(sentenceDetails.Offset, sentenceDetails.Len);

                        let newPartOfSpeechQuestion: MultipleChoiceQuestionModel = new MultipleChoiceQuestionModel(nextQuestionId, questionTypeId, questionTypeText, questionText, this.shuffleMultipleChoiceAnswers([correctAnswer].concat(wrongAnswers)));
                        partOfSpeechQuestions.push(newPartOfSpeechQuestion);

                        nextQuestionId += 1;

                        wrongAnswers = [];
                        correctAnswer = null;
                        correctAnswerPartOfSpeech = null;
                    }
                }
            }
        }

        return partOfSpeechQuestions;
    };


    private shuffleMultipleChoiceAnswers(choices:MultipleChoiceAnswerModel[]) {
        for (let i = choices.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [choices[i - 1], choices[j]] = [choices[j], choices[i - 1]];
        }

        return choices;
    }
}
