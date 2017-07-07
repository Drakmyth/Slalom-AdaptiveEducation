import {Router, Request, Response, NextFunction} from 'express';
import {IbmWatsonNluService} from '../ibm-watson/IbmWatsonNluService';
import {CommonAIService} from "../commonAI/commonAIService";
import {AzureLinguisticsService} from "../azureLinguistics/azureLinguisticsService";

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
        let serviceResponse = commonAIService.getMultipleChoiceQuestions(req.params.key);

        res.send(serviceResponse);
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
