class UserValidator {
  async get_user(req, res, next) {
    try {
      const { id } = req.body

      req.errors = []

      if (id.length !== 24) {
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
  async update_user(req, res, next) {
    try {
      const { userId, code } = req.body

      req.errors = []

      if (userId.length !== 24) {
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

module.exports = new UserValidator()
