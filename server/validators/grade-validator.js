class GradeValidator {
  async gr_create(req, res, next) {
    try {
      const {
        choosenStudent,
        attendance,
        grade,
        date,
        description,
        type,
        class_,
      } = req.body

      req.errors = []

      next()
    } catch (error) {
      console.log(error)
    }
  }
  async es_homework(req, res, next) {
    try {
      const {
        choosenStudent,
        grade,
        description,
        name_homework,
        student,
        class_,
      } = req.body

      req.errors = []
      if (class_.length !== 24) {
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
  async homework_to_es(req, res, next) {
    try {
      const { student, filename, name, id } = req.body

      req.errors = []
      if (student.length !== 24 || id.length !== 24) {
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
  async get_grades(req, res, next) {
    try {
      const { id, class_, user } = req.body

      req.errors = []

      next()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new GradeValidator()
