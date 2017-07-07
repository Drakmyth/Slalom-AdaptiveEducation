
import {AzureLinguisticsAnalyzers} from "./azureLinguisticsAnalyzers";
export class AzureLinguisticsInputModel {
    language: string;
    analyzerIds: string[];
    text: string;

    constructor(text) {
        this.text = text;
        this.language = 'en';
        this.analyzerIds = [AzureLinguisticsAnalyzers.tagAnalyzer, AzureLinguisticsAnalyzers.constituencyAnalyzer, AzureLinguisticsAnalyzers.tokenAnalyzer]
    }

}