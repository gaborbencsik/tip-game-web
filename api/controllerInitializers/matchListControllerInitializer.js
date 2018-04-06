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
    this.app.post('/competition/user/:userId/order', this.app.matchListController.saveOrder)
    this.app.get('/competition/matches', this.app.matchListController.getAll)
    this.app.get('/user/:userId/competition/matches', this.app.matchListController.getTipsForMatches)
    this.app.get('/competition/teams', this.app.matchListController.getTeams)
  }
}

module.exports = MatchListControllerInitializer;
