const FileService = require('../service/file-service')
var contentDisposition = require('content-disposition')
const fs = require('fs')

class FileController {
  async upload(req, res) {
    if (!req.file && !req.fileValidationError) {
      return res.status(200)
    }

    const file = req.file

    if (req.fileValidationError) {
      return res
        .status(400)
        .json({ message: req.fileValidationError, flag: '#D1557A' })
    }

    const data = await FileService.upload(
      file.originalname,
      file.mimetype,
      file.destination,
      file.filename,
      file.path,
      file.size,
    )

    if (data.filename) {
      return res.status(data.code).json(data.filename)
    }

    return res.status(data.code).json(data)
  }

  async delete(req, res) {
    try {
      const filename = req.params.filename

      const data = await FileService.delete(filename)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Delete file error' })
    }
  }
  async download(req, res) {
    try {
      const filename = req.params.filename

      const data = await FileService.download(filename)
      if (data && data.message) {
        return res.status(data.code).json(data)
      }

      let mimeType = data.contentType
      if (!mimeType) {
        mimeType = data.mimetype
      }

      res.set({
        'Content-Type': mimeType,
        'Content-Disposition': contentDisposition(data.path),
      })

      const readStream = fs.createReadStream(data.path)
      readStream.pipe(res)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Download file error' })
    }
  }

  async clear(req, res) {
    const data = await FileService.clear()
    return res.status(data.code)
  }
}

module.exports = new FileController()
