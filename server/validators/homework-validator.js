class HomeworkValidator {
  async cr_homework(req, res, next) {
    try {
      const { student, filename, name, id, date, link } = req.body

      req.errors = []

      if ((name && name.length < 6) || !name) {
        req.errors.push({
          message: '[INFO] Name must have more then six symbol!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      next()
    } catch (error) {
      console.log(error)
    }
  }

  async gt_homeworks(req, res, next) {
    try {
      if (req.method === 'OPTIONS') {
        next()
      }
      const { id, link } = req.body

      req.errors = []
      if (link.length !== 24) {
        req.errors.push({
          message: '[INFO] Incorrect data!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      next()
    } catch (error) {
      console.log(error)
    }
  }

  async dl_homework(req, res, next) {
    try {
      const { name } = req.body

      req.errors = []
      next()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new HomeworkValidator()
