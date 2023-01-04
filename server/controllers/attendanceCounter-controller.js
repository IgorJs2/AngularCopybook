const AttendanceCounterService = require('../service/attendanceCounter-service')

class AttendanceCounterController {
  async set_count(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { class_, id, date } = req.body

      const data = await AttendanceCounterService.set_count(class_, id, date)

      return res.status(data.code).json(data)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new AttendanceCounterController()
