const TipsController = require('../controllers/tipsController.js');

class TipsControllerInitializer {
  constructor(app) {
    this.app = app
  }

  build() {
    this.setupController();
    this.setupRoute();
  }

  setupController() {
    this.app.tipsController = new TipsController(this.app)
  }

  setupRoute() {
    this.app.get('/user/:user_id/tips', this.app.tipsController.get)
    this.app.put('/user/:user_id/tips/:tip_id', this.app.tipsController.save)
  }
}

module.exports = TipsControllerInitializer;
