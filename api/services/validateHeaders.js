class Validator {
  static checkCustomHeaders(headers) {
    if ('my-custom-header' in headers && headers['my-custom-header'] == 'example') {
      console.log('success')
      return true
    }
  }
}

module.exports = Validator
