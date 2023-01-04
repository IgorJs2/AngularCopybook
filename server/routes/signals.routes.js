const { Router } = require('express')
const SignalController = require('../controllers/signal-controller')
const SignalValidator = require('../validators/signal-validator')
const router = Router()

router.post(
  '/create_signal',
  SignalValidator.cr_signals,
  SignalController.cr_signals,
)
router.post(
  '/get_signals',
  SignalValidator.gt_signals,
  SignalController.gt_signals,
)
router.post(
  '/delete_signal',
  SignalValidator.del_signals,
  SignalController.del_signals,
)

module.exports = router
