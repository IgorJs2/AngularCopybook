const fs = require('fs')
const News = require('../models/News')
const Materials = require('../models/Materials')
const Files = require('../models/Files')
const Homeworks = require('../models/Homeworks')

class FileService {
  async upload(originalname, mimetype, destination, filename, path, size) {
    try {
      const file = new Files({
        originalname: originalname,
        mimetype: mimetype,
        destination: destination,
        filename: filename,
        path: path,
        size: size,
      })

      await file.save()

      return { filename: filename, code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Upload file error!', code: 500 }
    }
  }

  async delete(filename) {
    try {
      const file = await Files.findOne({ filename })

      if (file) {
        fs.unlink(file.path, () => {})
        await Files.deleteOne({ filename })
      } else {
        return { message: '[INFO] File not found!', code: 400 }
      }
      return { message: '[INFO] File succesfully removed!', code: 200 }
    } catch (error) {
      console.log(error)
      return { message: '[INFO] Delete file error!', code: 500 }
    }
  }
  async download(filename) {
    try {
      const file = await Files.findOne({ filename })

      if (!file) {
        return { message: '[INFO] File not found!', code: 400 }
      }

      return file
    } catch (error) {
      console.log(error)
      return { message: '[INFO] Download file error!', code: 500 }
    }
  }

  async clear() {
    try {
      let counterNews = 0
      let counterMaterials = 0
      let counterHomeworks = 0
      const News_list = await News.find({})
      const Materials_list = await Materials.find({})
      const Homeworks_list = await Homeworks.find({})
      const Files_list = await Files.find({})
      Files_list.map((err, i, files) => {
        if (!files || files.length === 0) {
          console.log('[SERVER] Files not found!')
          return { code: 500 }
        } else {
          files.map(async (file) => {
            if (file.filename) {
              News_list.map((news) => {
                if (news.file != file.filename) {
                  counterNews++
                }
              })
              Materials_list.map((materials) => {
                if (materials.filename != file.filename) {
                  counterMaterials++
                }
              })
              Homeworks_list.map((homeworks) => {
                if (homeworks.filename != file.filename) {
                  counterHomeworks++
                }
              })
            }
            if (
              News_list.length === counterNews &&
              Materials_list.length === counterMaterials &&
              Homeworks_list.length === counterHomeworks
            ) {
              counterHomeworks = 0
              counterNews = 0
              counterMaterials = 0
              const file_find = await Files.findOne({
                filename: file.filename,
              })
              if (file_find) {
                fs.unlink(file_find.path, () => {})
              } else {
                console.log('[SERVER] File not found!')
                return { code: 500 }
              }
              await Files.deleteOne({ filename: file.filename })
            } else {
              counterNews = 0
              counterMaterials = 0
              counterHomeworks = 0
            }
          })
        }
      })
      console.log('[SERVER] Files succesfully cleared')
      return { code: 200 }
    } catch (error) {
      console.log(error)
      console.log('[SERVER] Files clear error')
      return { code: 500 }
    }
  }
}

module.exports = new FileService()
