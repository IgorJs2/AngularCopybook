const { Router } = require('express')
const MaterialController = require('../controllers/material-controller')
const MaterialValidator = require('../validators/material-validator')
const router = Router()

router.post(
  '/create_material',
  MaterialValidator.cr_material,
  MaterialController.cr_material,
)
router.post(
  '/get_materials',
  MaterialValidator.gt_materials,
  MaterialController.gt_materials,
)

module.exports = router
