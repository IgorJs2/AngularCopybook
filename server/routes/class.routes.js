const { Router } = require('express')
const ClassValidator = require('../validators/class-validator')
const ClassController = require('../controllers/class-controller')
const router = Router()

router.post('/class', ClassValidator.class, ClassController.class)
router.post('/connect_class', ClassValidator.connect, ClassController.connect)
router.post(
  '/disconnect_class',
  ClassValidator.disconnect,
  ClassController.disconnect,
)
router.post('/create_class', ClassValidator.create, ClassController.create)
router.post('/delete_class', ClassValidator.delete, ClassController.delete)
router.post('/get_class', ClassValidator.get_class, ClassController.get_class)

module.exports = router
