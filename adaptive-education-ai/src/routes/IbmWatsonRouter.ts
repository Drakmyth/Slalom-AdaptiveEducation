import {Router, Request, Response, NextFunction} from 'express';

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
  public getQuestions(req: Request, res: Response, next: NextFunction) {
    res.send('Call getQuestions Routes');    
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/getQuestions', this.getQuestions);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const ibmWatsonRoutes = new IbmWatsonRouter();
ibmWatsonRoutes.init();

export default ibmWatsonRoutes.router;
