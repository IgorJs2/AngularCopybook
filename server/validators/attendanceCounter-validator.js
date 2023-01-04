class AttendanceCounterValidator {
  async set_count(req, res, next) {
    try {
      const { class_, id, date } = req.body

      req.errors = []

      if (class_.length !== 24 || id.length !== 24) {
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

module.exports = new AttendanceCounterValidator()
