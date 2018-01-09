const MatchListController = require('../controllers/matchListController.js');

class MatchListControllerInitializer{
  constructor(app) {
    this.app = app
  }

  build() {
    this.setupController();
    this.setupRoutes();
  }

  setupController() {
    this.app.matchListController = new MatchListController
  }

  setupRoutes() {
    this.app.get('/matches', this.app.matchListController.getAll)
    this.app.get('/user/:userId/matches', this.app.matchListController.getTipsForMatches)
  }
}

module.exports = MatchListControllerInitializer;
