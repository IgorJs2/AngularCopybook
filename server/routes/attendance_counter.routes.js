const { Router } = require('express')
const router = Router()
const AttendanceCounterValidator = require('../validators/attendanceCounter-validator')
const AttendanceCounterController = require('../controllers/attendanceCounter-controller')

router.post(
  '/set_count',
  AttendanceCounterValidator.set_count,
  AttendanceCounterController.set_count,
)

module.exports = router
