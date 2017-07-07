import TextAnalysisModel from "./textAnalysisModel";

class TextAnalysesSingleton extends Array<TextAnalysisModel> {

    private static _instance: TextAnalysesSingleton;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

export const TextAnalyses = TextAnalysesSingleton.Instance;