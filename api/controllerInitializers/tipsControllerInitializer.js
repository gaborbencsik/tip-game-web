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
    this.app.get('/user/:userId/tips', this.app.tipsController.get)
    this.app.put('/user/:userId/matches/:matchId', this.app.tipsController.save)
  }
}

module.exports = TipsControllerInitializer;
