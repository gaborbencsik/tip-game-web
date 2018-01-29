const UserController = require('../controllers/userController.js')

class UserControllerInitializer {
  constructor(app) {
    this.app = app
  }

  build() {
    this.setupController();
    this.setupRoute();
  }

  setupController() {
    this.app.userController = new UserController(this.app)
  }

  setupRoute() {
    this.app.post('/login', this.app.userController.login)
    this.app.post('/registration', this.app.userController.register)
    this.app.get('/user/:userId/profile', this.app.userController.getProfile)
    this.app.get('/user/:userId/score', this.app.userController.getCurrentScore)
    this.app.post('/user/:userId/competition/favourite-team', this.app.userController.setFavouriteTeam)
  }
}

module.exports = UserControllerInitializer;
