// import axios from 'axios'

export default {
  login: function (credentials) {
    console.log('login', credentials)
  },
  register: function (credentials) {
    console.log('reg', credentials)
    return new Promise(function (resolve, reject) {
      resolve('ok')
    })
  }
}
