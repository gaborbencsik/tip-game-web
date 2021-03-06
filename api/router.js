const tipsControllerInitializer = require('./controllerInitializers/tipsControllerInitializer.js');
const matchListControllerInitializer = require('./controllerInitializers/matchListControllerInitializer.js');
const userControllerInitializer = require('./controllerInitializers/userControllerInitializer.js');
const healthcheckControllerInitializer = require('./controllerInitializers/healthcheckControllerInitializer.js');

class Router {
  constructor(app) {
    this.app = app
  }

  setupRoutes() {
    let initialzers = [
      new matchListControllerInitializer(this.app),
      new tipsControllerInitializer(this.app),
      new userControllerInitializer(this.app),
      new healthcheckControllerInitializer(this.app)
    ]

    initialzers.forEach( (initialzer) => {
      initialzer.build();
    })

    this.app.use(function(req, res){
      res.status(404).send({success: false, message: 'Oppps'});
   });
  }
}

module.exports = Router;
