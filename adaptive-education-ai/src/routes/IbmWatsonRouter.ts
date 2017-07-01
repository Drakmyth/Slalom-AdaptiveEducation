import {Router, Request, Response, NextFunction} from 'express';
import SemanticRolesModel from '../ibm-watson/SemanticRolesModel';

export class IbmWatsonRouter {
  router: Router

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send('Call getAll Routes');    
  }

  /**
   * GET.
   */
  public analyzeText(req: Request, res: Response, next: NextFunction) {
    console.log('analyzeText api');

    var fs = require('fs');
    var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
    var nlu = new NaturalLanguageUnderstandingV1({
      username: 'af6311ab-9757-48bc-8e4f-7598198ce369',
      password: '2fcJVuiSI45V',
      version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });

    var text = 'This is a software called Adaptive Education. This is for AI Hackathon. This is just a test string';
    var result = '';
    // var text = request.body.name;
    nlu.analyze({
        'html': text, // Buffer or String 
        'features': {
            'concepts': {},
            'keywords': {},
            'entities': {}
        }
    }, function(err, response) {
        if (err) {
            console.log('error:', err);
        }
        else {
            result = JSON.stringify(response, null);
        }
    });    

    let semanticRolesModel: SemanticRolesModel;
    semanticRolesModel = new SemanticRolesModel('my sentence', 'subject', 'action', 'object');
    console.log(semanticRolesModel.printOut());

    res.send('Call getQuestions Routes');    
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/analyze-text', this.analyzeText);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const ibmWatsonRoutes = new IbmWatsonRouter();
ibmWatsonRoutes.init();

export default ibmWatsonRoutes.router;
