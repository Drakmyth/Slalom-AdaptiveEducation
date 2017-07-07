import WatsonResultModel from "../ibm-watson/WatsonResultModel";
import {IAzureLinguisticsOutputModel} from "../azureLinguistics/azureLinguisticsOutputModel";

export default class TextAnalysisModel {
    isFinished: boolean;
    text: string;
    watsonResult: WatsonResultModel;
    azureLinguisticsResult: IAzureLinguisticsOutputModel[];

    constructor(text: string){
        this.isFinished = false;
        this.text = text;
    }

}