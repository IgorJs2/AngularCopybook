const Materials = require('../models/Materials')

class MaterialService {
  async cr_material(name, filename, id) {
    try {
      if (!filename) {
        return {
          message: '[INFO] Please choose file!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const name_check = await Materials.findOne({ name })
      if (name_check) {
        return { message: '[INFO] Duplicate name', flag: '#EAC15A', code: 400 }
      }

      const date = new Date()

      const Material = new Materials({
        name,
        date: date.toLocaleDateString(),
        filename,
        class: id,
      })

      await Material.save()

      return { message: '[INFO] Material send', flag: '#66D9BD', code: 200 }
    } catch (error) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }

  async gt_materials(id) {
    try {
      if (id) {
        const findMaterials = await Materials.find({ class: id }).sort({
          date: -1,
        })
        return { findMaterials, code: 200 }
      } else {
        return {
          message: '[OPTIONS] Get materials error!',
          flag: '#D1557A',
          code: 400,
        }
      }
    } catch (e) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
}

module.exports = new MaterialService()
