import {Router, Request, Response, NextFunction} from 'express';
import {IbmWatsonNluService} from "../ibm-watson/IbmWatsonNluService";
import {TextAnalyses} from "../commonAI/textAnalyses";

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
  getWatsonResults = (req: Request, res: Response, next: NextFunction) => {
      if (TextAnalyses[req.params.key] && TextAnalyses[req.params.key].watsonResult) {
          res.send(TextAnalyses[req.params.key].watsonResult);
      } else {
          res.send([]);
      }
  };

  /**
   * Get
   */
  getSemanticRolesResult = (req: Request, res: Response, next: NextFunction) => {
      if (TextAnalyses[req.params.key] && TextAnalyses[req.params.key].watsonResult.semanticRoles) {
          res.send(TextAnalyses[req.params.key].watsonResult.semanticRoles);
      } else {
          res.send([]);
      }
  };


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init = () => {
    this.router.get('/get-watson-results/:key?', this.getWatsonResults);
    this.router.get('/get-semantic-roles-results/:key', this.getSemanticRolesResult);
  };

}

// Create the HeroRouter, and export its configured Express.Router
const ibmWatsonRoutes = new IbmWatsonRouter();
ibmWatsonRoutes.init();

export default ibmWatsonRoutes.router;
