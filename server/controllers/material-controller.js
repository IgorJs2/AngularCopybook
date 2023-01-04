const MaterialService = require('../service/material-service')

class MaterialController {
  async cr_material(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { name, filename, id } = req.body
      const data = await MaterialService.cr_material(name, filename, id)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }

  async gt_materials(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id } = req.body
      const data = await MaterialService.gt_materials(id)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new MaterialController()
