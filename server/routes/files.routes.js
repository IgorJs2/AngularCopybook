const { Router } = require('express')
const router = Router()
const FileController = require('../controllers/file-controller')
const upload = require('../middleware/file.middleware')

router.post('/upload', upload.single('file'), FileController.upload)
router.delete('/delete/:filename', FileController.delete)
router.get('/download/:filename', FileController.download)
router.delete('/clear', FileController.clear)

module.exports = router
