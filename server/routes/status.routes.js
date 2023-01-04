const { Router } = require('express')
const StatusValidator = require('../validators/status-validator')
const StatusController = require('../controllers/status-controller')
const router = Router()

router.post(
  '/set_status',
  StatusValidator.st_status,
  StatusController.st_status,
)
router.post(
  '/get_status',
  StatusValidator.gt_status,
  StatusController.gt_status,
)

module.exports = router
