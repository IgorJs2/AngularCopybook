const AnswerService = require('../service/answer-service')

class AnswerController {
  async get_answers(req, res, next) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { user, class_ } = req.body

      const data = await AnswerService.get_answers(user, class_)

      return res.status(data.code).json({ findAnswers: data.info })
    } catch (e) {
      console.log(e)
    }
  }

  async get_answer(req, res, next) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { user, class_, title } = req.body

      const data = await AnswerService.get_answer(user, class_, title)

      return res.status(data.code).json({ answer: data.info })
    } catch (e) {
      console.log(e)
    }
  }

  async create_answer(req, res, next) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { answer, class_, teacher, signal, student } = req.body

      const data = await AnswerService.create_answer(
        answer,
        class_,
        teacher,
        signal,
        student,
      )

      return res.status(data.code).json(data || data.info)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new AnswerController()
