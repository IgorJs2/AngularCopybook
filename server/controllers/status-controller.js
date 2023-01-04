const StatusService = require('../service/status-service')

class StatusController {
  async st_status(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { student, object, status, name, class_ } = req.body
      const data = await StatusService.st_status(
        student,
        object,
        status,
        name,
        class_,
      )

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async gt_status(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { student, object, class_ } = req.body
      const data = await StatusService.gt_status(student, object, class_)

      return res.status(data.code).json(data.ResponseArray)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new StatusController()
