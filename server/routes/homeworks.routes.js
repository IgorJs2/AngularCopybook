const { Router } = require('express')
const HomeworkController = require('../controllers/homework-controller')
const HomeworkValidator = require('../validators/homework-validator')
const router = Router()

router.post(
  '/create_homework',
  HomeworkValidator.cr_homework,
  HomeworkController.cr_homework,
)
router.post(
  '/get_homeworks',
  HomeworkValidator.gt_homeworks,
  HomeworkController.gt_homeworks,
)
router.post(
  '/delete_homework',
  HomeworkValidator.dl_homework,
  HomeworkController.dl_homework,
)

module.exports = router
