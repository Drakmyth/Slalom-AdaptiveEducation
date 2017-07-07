import TextAnalysisModel from "./textAnalysisModel";
import {IbmWatsonNluService} from "../ibm-watson/IbmWatsonNluService";
import MultipleChoiceQuestionModel from "./multipleChoiceQuestionModel";
import {AzureLinguisticsService} from "../azureLinguistics/azureLinguisticsService";
import {TextAnalyses} from "./textAnalyses";

const ibmWatsonNluService = new IbmWatsonNluService();
const azureLinguisticsService = new AzureLinguisticsService();

export class CommonAIService {

     pushNewTextAnalysis = (text: string):number => {
        return TextAnalyses.push(new TextAnalysisModel(text));
     };

    getMultipleChoiceQuestions = (index: number): MultipleChoiceQuestionModel[] => {
        if (!TextAnalyses[index] || !TextAnalyses[index].isFinished) {
            return [];
        }

        let textAnalysis: TextAnalysisModel = TextAnalyses[index];

        let saoQuestions:MultipleChoiceQuestionModel[] = ibmWatsonNluService.generateMultipleChoiceQuestions(textAnalysis, 0);

        let partOfSpeechQuestions:MultipleChoiceQuestionModel[] = azureLinguisticsService.generateMultipleChoiceQuestions(textAnalysis, saoQuestions.length);

        return this.shuffleMultipleChoiceQuestions(saoQuestions.concat(partOfSpeechQuestions));
    };

    shuffleMultipleChoiceQuestions = (questions:MultipleChoiceQuestionModel[]): MultipleChoiceQuestionModel[] => {
        // ¯\_(ツ)_/¯ http://jsperf.com/shuffle-optimization-00129393
        let l = questions.length + 1;

        while (l--) {
            let r = ~~(Math.random() * l),
                o = questions[r];

            questions[r] = questions[0];
            questions[0] = o;
        }

        return questions;
    };
}