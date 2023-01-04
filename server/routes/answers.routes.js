const { Router } = require('express')
const AnswerController = require('../controllers/answer-controller')
const AnswerValidator = require('../validators/answer-validator')
const router = Router()

router.post(
  '/create_answer',
  AnswerValidator.create_answer,
  AnswerController.create_answer,
)
router.post(
  '/get_answers',
  AnswerValidator.get_answers,
  AnswerController.get_answers,
)
router.post(
  '/get_answer',
  AnswerValidator.get_answer,
  AnswerController.get_answer,
)

module.exports = router
