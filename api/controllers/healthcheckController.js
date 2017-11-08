class HealthcheckController {

  get(req, res) {
    res.send({success: true})
  }
  
}

module.exports = HealthcheckController
