const AuthService = require('../service/auth-service')

class AuthController {
  async auth(req, res) {
    try {
      const errors = req.errors

      if (errors && errors[0]) {
        return res.status(400).json(errors[0])
      }

      const data = await AuthService.auth(req.user.userId)

      return res.status(200).json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }

  async login(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { password, login } = req.body

      const data = await AuthService.login(login, password)
      if (data.message) {
        return res.status(400).json(data)
      }

      return res.status(200).json(data)
    } catch (e) {
      return res.status(500).json({ message: '[INFO] Server error!' })
    }
  }
  async register(req, res) {
    const errors = req.errors

    if (errors[0]) {
      return res.status(400).json(errors[0])
    }

    const { email, password, login, role } = req.body

    const data = await AuthService.register(email, password, login, role)
    if (data.message) {
      return res.status(400).json(data)
    }

    return res.status(200).json(data)
  }
  async forgot(req, res) {
    const errors = req.errors

    if (errors[0]) {
      return res.status(400).json(errors[0])
    }

    const { email } = req.body

    const data = await AuthService.forgot(email)
    if (data.message) {
      return res.status(400).json(data)
    }

    return res.status(200).json(data)
  }
  async change_password(req, res) {
    const errors = req.errors

    if (errors[0]) {
      return res.status(400).json(errors[0])
    }

    const { newPass, confirmPass, link } = req.body

    const data = await AuthService.change_password(newPass, link)
    if (data.message) {
      return res.status(400).json(data)
    }

    return res.status(200).json(data)
  }
}

module.exports = new AuthController()
