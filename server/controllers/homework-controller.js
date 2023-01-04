const HomeworkService = require('../service/homework-service')

class HomeworkController {
  async cr_homework(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { student, filename, name, id, date, link } = req.body

      const data = await HomeworkService.cr_homework(
        student,
        filename,
        name,
        id,
        date,
        link,
      )

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async gt_homeworks(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id, link } = req.body

      const data = await HomeworkService.gt_homeworks(id, link)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async dl_homework(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { name } = req.body

      const data = await HomeworkService.dl_homework(name)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new HomeworkController()
