const { Router } = require('express')
const GradeController = require('../controllers/grade-controller')
const GradeValidator = require('../validators/grade-validator')
const router = Router()

router.post(
  '/grade_create',
  GradeValidator.gr_create,
  GradeController.gr_create,
)
router.post(
  '/estimate_homework',
  GradeValidator.es_homework,
  GradeController.es_homework,
)
router.post(
  '/homework_to_estimate',
  GradeValidator.homework_to_es,
  GradeController.homework_to_es,
)
router.post(
  '/get_grades',
  GradeValidator.get_grades,
  GradeController.get_grades,
)

module.exports = router
