const { Router } = require('express')
const router = Router()
const AuthController = require('../controllers/auth-controller')
const AuthValidator = require('../validators/auth-validator')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/auth', authMiddleware, AuthController.auth)
router.post('/login', AuthValidator.login, AuthController.login)
router.post('/register', AuthValidator.register, AuthController.register)
router.post('/forgot', AuthValidator.forgot, AuthController.forgot)
router.post(
  '/change_password',
  AuthValidator.change_password,
  AuthController.change_password,
)

module.exports = router
