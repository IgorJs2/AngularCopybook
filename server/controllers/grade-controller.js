const GradeService = require('../service/grade-service')

class GradeController {
  async gr_create(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const {
        choosenStudent,
        attendance,
        grade,
        date,
        description,
        type,
        class_,
      } = req.body

      const data = await GradeService.gr_create(
        choosenStudent,
        attendance,
        grade,
        date,
        description,
        type,
        class_,
      )

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async es_homework(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const {
        choosenStudent,
        grade,
        description,
        name_homework,
        student,
        class_,
      } = req.body

      const data = await GradeService.es_homework(
        choosenStudent,
        grade,
        description,
        name_homework,
        student,
        class_,
      )

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async homework_to_es(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { student, filename, name, id } = req.body

      const data = await GradeService.homework_to_es(
        student,
        filename,
        name,
        id,
      )

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async get_grades(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { id, class_, user } = req.body
      const data = await GradeService.get_grades(id, class_, user)
      return res.status(data.code).json({ data: data.data })
    } catch (e) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new GradeController()
