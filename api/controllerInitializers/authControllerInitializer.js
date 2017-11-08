const AuthController = require('../controllers/authController.js')

class AuthControllerInitializer {
  constructor(app) {
    this.app = app
  }

  build() {
    this.setupController();
    this.setupRoute();
  }

  setupController() {
    this.app.authController = new AuthController(this.app)
  }

  setupRoute() {
    this.app.post('/login', this.app.authController.login)
    this.app.post('/registration', this.app.authController.register)
  }
}

module.exports = AuthControllerInitializer;
