const { Router } = require('express')
const UserController = require('../controllers/user-controller')
const UserValidator = require('../validators/user-validator')
const router = Router()

router.post('/get_user', UserValidator.get_user, UserController.get_user)
router.post(
  '/update_user',
  UserValidator.update_user,
  UserController.update_user,
)

module.exports = router
