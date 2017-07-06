import {Router, Request, Response, NextFunction} from 'express';
import SemanticRolesModel from '../ibm-watson/SemanticRolesModel';
import IbmWatsonNluService from '../ibm-watson/IbmWatsonNluService';
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const ibmWatsonNluService = new IbmWatsonNluService();

export class IbmWatsonRouter {
  router: Router;

  /**
   * Initialize the Router
   */
  constructor() {
    this.router = Router();
    this.init();       
  }

  /**
   * Get
   */
  public getWatsonResults(req: Request, res: Response, next: NextFunction) {
    res.send(ibmWatsonNluService.getWatsonResult());    
  }

  /**
   * Get
   */
  public getSemanticRolesResult(req: Request, res: Response, next: NextFunction) {
    res.send(ibmWatsonNluService.getSemanticRolesResult());    
  }  

  /**
   * Get
   */
  public getSaoQuestions(req: Request, res: Response, next: NextFunction) {
    res.send(ibmWatsonNluService.generateSaoQuestions());    
  }

  /**
   * POST Analyze-Text.
   */
  public analyzeText(req: Request, res: Response, next: NextFunction) {
    let text = req.body.text;
    let watsonResult = '';

    // setting up natural language understanding
    let nlu = new NaturalLanguageUnderstandingV1({
        username: 'af6311ab-9757-48bc-8e4f-7598198ce369',
        password: '2fcJVuiSI45V',
        version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
      });     

    // analyze Text
    nlu.analyze({
        'html': text, // Buffer or String 
        'features': {
            'semantic_roles': {}
        }
    }, function(err, response) {
        if (err) {
            console.log('error:', err);
        }
        else {
            watsonResult = JSON.stringify(response, null);   
            ibmWatsonNluService.setWatsonResult(JSON.parse(watsonResult)); 
        }
    });    
        
    res.send('successfully analyze text');    
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/get-watson-results', this.getWatsonResults);
    this.router.get('/get-semantic-roles-results', this.getSemanticRolesResult);
    this.router.get('/get-sao-questions', this.getSaoQuestions);
    this.router.post('/analyze-text', this.analyzeText);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const ibmWatsonRoutes = new IbmWatsonRouter();
ibmWatsonRoutes.init();

export default ibmWatsonRoutes.router;
