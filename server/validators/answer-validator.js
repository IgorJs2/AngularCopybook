class AnswerValidator {
  async create_answer(req, res, next) {
    try {
      const { answer, class_, teacher, signal, student } = req.body

      req.errors = []

      if ((answer && answer.length < 6) || !answer) {
        req.errors.push({
          message: '[INFO] Answers must have more then six symbol!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if (class_.length !== 24 || teacher.length !== 24) {
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

  async get_answers(req, res, next) {
    try {
      const { user, class_ } = req.body

      req.errors = []
      if (user.length !== 24 || class_.length !== 24) {
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

  async get_answer(req, res, next) {
    try {
      const { user, class_, title } = req.body

      req.errors = []
      if (user.length !== 24 || class_.length !== 24) {
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

module.exports = new AnswerValidator()
