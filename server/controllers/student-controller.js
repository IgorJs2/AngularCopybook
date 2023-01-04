const StudentService = require('../service/student-service')

class StudentController {
  async gt_st(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id } = req.body
      const data = await StudentService.gt_st(id)
      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async get_student_data(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { class_, id, user } = req.body
      const data = await StudentService.get_student_data(class_, id, user)

      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async get_chart_grade(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id, class_, user } = req.body
      const data = await StudentService.get_chart_grade(id, class_, user)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async get_chart_type_grades(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id, class_, user } = req.body
      const data = await StudentService.get_chart_type_grades(id, class_, user)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new StudentController()
