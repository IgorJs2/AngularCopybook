class StudentValidator {
  async gt_st(req, res, next) {
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
  async get_student_data(req, res, next) {
    try {
      const { class_, id, user } = req.body

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
  async get_chart_grade(req, res, next) {
    try {
      const { class_, id, user } = req.body

      req.errors = []

      if (id.length !== 24 || class_.length !== 24) {
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
  async get_chart_type_grades(req, res, next) {
    try {
      const { id, class_, user } = req.body

      req.errors = []

      if (id.length !== 24 || class_.length !== 24) {
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

module.exports = new StudentValidator()
