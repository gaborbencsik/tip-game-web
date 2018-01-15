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
  }
}

module.exports = UserControllerInitializer;
