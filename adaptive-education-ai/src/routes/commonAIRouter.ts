import {Router, Request, Response, NextFunction} from 'express';
import {IbmWatsonNluService} from '../ibm-watson/IbmWatsonNluService';
import {CommonAIService} from "../commonAI/commonAIService";
import {AzureLinguisticsService} from "../azureLinguistics/azureLinguisticsService";
import {ServiceResponseWrapper} from "../commonAI/serviceResponseWrapper";
import MultipleChoiceQuestionModel from "../commonAI/multipleChoiceQuestionModel";
import {TextAnalyses} from "../commonAI/textAnalyses";

const ibmWatsonNluService = new IbmWatsonNluService();
const azureLinguisticsService = new AzureLinguisticsService();
const commonAIService = new CommonAIService();
const fs = require('fs');

export class CommonAIRouter {
  router: Router;

  /**
   * Initialize the Router
   */
  constructor() {
    this.router = Router();
    this.init();       
  }

  /**
   * POST Analyze-Text.
   */
  analyzeText = (req: Request, res: Response, next: NextFunction) => {
    let text = req.body.text;

    let index: number = commonAIService.pushNewTextAnalysis(text) - 1;
    ibmWatsonNluService.analyzeText(text, index);
    azureLinguisticsService.analyzeText(text, index);

    let jsonData = {};
    jsonData['id'] = index;
    jsonData['message'] = 'successfully analyzing text';

    res.send(JSON.stringify(jsonData));    
  };

    /**
     * Get
     */
    getQuestions = (req: Request, res: Response, next: NextFunction) => {
        let serviceResponseWrapper: ServiceResponseWrapper<MultipleChoiceQuestionModel[]>;
        let serviceResponse: MultipleChoiceQuestionModel[] = [];
        let isFinished: boolean = false; //just in case it finishes in the fractions of seconds between the check and the return

        if (TextAnalyses[req.params.key] && TextAnalyses[req.params.key].isFinished) {
            isFinished = true;
            serviceResponse = commonAIService.getMultipleChoiceQuestions(req.params.key);
        }

        serviceResponseWrapper = new ServiceResponseWrapper(isFinished, serviceResponse);

        res.send(serviceResponseWrapper);
    };

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init = () => {
    this.router.post('/analyze-text', this.analyzeText);
    this.router.get('/get-questions/:key', this.getQuestions)
  };

}

// Create the HeroRouter, and export its configured Express.Router
const commonAIRouter = new CommonAIRouter();
commonAIRouter.init();

export default commonAIRouter.router;
