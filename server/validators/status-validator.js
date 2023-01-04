class StatusValidator {
  async st_status(req, res, next) {
    try {
      const { student, object, status, name, class_ } = req.body

      req.errors = []

      if (student.length !== 24 || object.length !== 24) {
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
  async gt_status(req, res, next) {
    try {
      const { student, object, class_ } = req.body

      req.errors = []

      if (student.length !== 24) {
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

module.exports = new StatusValidator()
