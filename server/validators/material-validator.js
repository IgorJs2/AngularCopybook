class MaterialValidator {
  async cr_material(req, res, next) {
    try {
      const { name, filename, id } = req.body

      req.errors = []

      if ((name && name.length < 4) || !name) {
        req.errors.push({
          message: '[INFO] Name must have more then four symbol!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      next()
    } catch (error) {
      console.log(error)
    }
  }

  async gt_materials(req, res, next) {
    try {
      if (req.method === 'OPTIONS') {
        next()
      }
      const { id } = req.body

      req.errors = []

      next()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MaterialValidator()
