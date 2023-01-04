const { Router } = require('express')
const StudentValidator = require('../validators/student-validator')
const StudentController = require('../controllers/student-controller')
const router = Router()

router.post('/get_student', StudentValidator.gt_st, StudentController.gt_st)
router.post(
  '/get_student_data',
  StudentValidator.get_student_data,
  StudentController.get_student_data,
)
router.post(
  '/get_chart_grade',
  StudentValidator.get_chart_grade,
  StudentController.get_chart_grade,
)
router.post(
  '/get_chart_type_grades',
  StudentValidator.get_chart_type_grades,
  StudentController.get_chart_type_grades,
)

module.exports = router
