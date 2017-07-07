export interface IAzureLinguisticsOutputModel {
    analyzerId: string;
    result: any[];
}

export class AzureLinguisticsTagOutputModel implements  IAzureLinguisticsOutputModel {
    analyzerId: string;
    result: string[][];
}

export class AzureLinguisticsConstituencyOutputModel implements  IAzureLinguisticsOutputModel {
    analyzerId: string;
    result: string[];
}

export class AzureLinguisticsTokenOutputModel implements IAzureLinguisticsOutputModel {
    analyzerId: string;
    result: AzureLinguisticsSentenceTokenResultModel[];
}

export class AzureLinguisticsSentenceTokenResultModel {
    Len: number;
    Offset: number;
    Tokens: AzureLinguisticsTokenResultModel[];
}

export class AzureLinguisticsTokenResultModel {
    Len: number;
    NormalizedToken: string;
    Offset: number;
    RawToken:string
}
