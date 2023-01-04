const ClassService = require('../service/class-service')

class ClassController {
  async class(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { id } = req.body

      const data = await ClassService.class(id)

      return res.status(data.code).json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async connect(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { code, student } = req.body

      const data = await ClassService.connect(code, student)

      return res.status(data.code).json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async disconnect(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { name, student } = req.body

      const data = await ClassService.disconnect(name, student)

      return res.status(data.code).json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async create(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { className, code, teacher } = req.body

      const data = await ClassService.create(className, code, teacher)

      return res.status(data.code).json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async delete(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { className, code, teacher } = req.body

      const data = await ClassService.delete(className, code, teacher)

      return res.status(data.code).json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async get_class(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }

      const { id } = req.body

      const data = await ClassService.get_class(id)

      return res.status(data.code).json(data)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new ClassController()
