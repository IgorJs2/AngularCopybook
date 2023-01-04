const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    const types = [
      '.png',
      '.jpg',
      '.txt',
      '.jpeg',
      '.rtf',
      '.log',
      '.docx',
      '.doc',
      '.rar',
      '.zip',
      '.xlsx',
      '.pptx',
    ]
    const fileSize = parseInt(req.headers['content-length'])
    if (fileSize > 1024 * 1024 * 15) {
      req.fileValidationError = '[INFO] Upload limit is 15 MB!'
      return cb(null, false, req.fileValidationError)
    }
    if (!types.includes(ext)) {
      req.fileValidationError =
        '[INFO] Upload support only: Image files | Text files | ZIP or RAR files!'
      return cb(null, false, req.fileValidationError)
    }
    cb(null, true)
  },
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
})

module.exports = upload
