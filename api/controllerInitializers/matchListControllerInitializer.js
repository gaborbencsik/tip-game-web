const MatchListController = require('../controllers/matchListController.js');

class MatchListControllerInitializer{
  constructor(app) {
    this.app = app
  }

  build() {
    this.setupController();
    this.setupRoute();
  }

  setupController() {
    this.app.matchListController = new MatchListController
  }

  setupRoute() {
    this.app.get('/match-list', this.app.matchListController.get)
  }
}

module.exports = MatchListControllerInitializer;