const tipsControllerInitializer = require('./controllerInitializers/tipsControllerInitializer.js');
const matchListControllerInitializer = require('./controllerInitializers/matchListControllerInitializer.js');
const authControllerInitializer = require('./controllerInitializers/authControllerInitializer.js');
const healthcheckControllerInitializer = require('./controllerInitializers/healthcheckControllerInitializer.js');

class Router {
  constructor(app) {
    this.app = app
  }

  setupRoutes() {
    let initialzers = [
      new matchListControllerInitializer(this.app),
      new tipsControllerInitializer(this.app),
      new authControllerInitializer(this.app),
      new healthcheckControllerInitializer(this.app)
    ]

    initialzers.forEach( (initialzer) => {
      initialzer.build();
    })
  }
}

module.exports = Router;