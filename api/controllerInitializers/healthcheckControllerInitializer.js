const HealthcheckController = require('../controllers/healthcheckController.js')

class HealthcheckControllerInitializer {
  constructor(app) {
    this.app = app
  }

  build() {
    this.setupController();
    this.setupRoute();
  }

  setupController() {
    this.app.healthcheckController = new HealthcheckController(this.app)
  }

  setupRoute() {
    this.app.get('/', this.app.healthcheckController.get)
  }
}

module.exports = HealthcheckControllerInitializer;
