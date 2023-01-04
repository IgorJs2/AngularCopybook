class AuthValidator {
  async login(req, res, next) {
    try {
      const { login, password } = req.body

      req.errors = []

      next()
    } catch (error) {
      console.log(error)
    }
  }

  async register(req, res, next) {
    try {
      const { email, password, login, role } = req.body

      req.errors = []

      const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!regexMail.test(email)) {
        req.errors.push({
          message: '[INFO] Incorrect email!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if (password.length < 6) {
        req.errors.push({
          message: '[INFO] Minimum length of password is 6!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if (login.length < 10) {
        req.errors.push({
          message: '[INFO] Minimum length of login is 10!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if (!role || (role !== 'Teacher' && role !== 'Student')) {
        req.errors.push({
          message: '[INFO] Choose role!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      next()
    } catch (error) {
      console.log(error)
    }
  }
  async forgot(req, res, next) {
    try {
      const { email } = req.body

      req.errors = []

      const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!regexMail.test(email)) {
        req.errors.push({
          message: '[INFO] Incorrect email!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      next()
    } catch (error) {
      console.log(error)
    }
  }
  async change_password(req, res, next) {
    try {
      const { newPass, confirmPass, link } = req.body

      req.errors = []

      if (newPass.length < 6) {
        req.errors.push({
          message: '[INFO] Minimum length of password is 6!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      if (newPass !== confirmPass) {
        req.errors.push({
          message: '[INFO] Password do not match!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if (link && link.length !== 16) {
        req.errors.push({
          message: '[INFO] Incorrect data!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      next()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new AuthValidator()
