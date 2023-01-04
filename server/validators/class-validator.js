class ClassValidator {
  async class(req, res, next) {
    try {
      const { id } = req.body

      req.errors = []

      if (id.length !== 24) {
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
  async connect(req, res, next) {
    try {
      const { code, student } = req.body

      req.errors = []

      if (student.length !== 24) {
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
  async disconnect(req, res, next) {
    try {
      const { name, student } = req.body

      req.errors = []

      if (student.length !== 24) {
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
  async create(req, res, next) {
    try {
      const { className, code, teacher } = req.body

      req.errors = []

      if (className.length < 5) {
        req.errors.push({
          message: '[INFO] Сlass name must have more then five symbol!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if (code.length < 6) {
        req.errors.push({
          message: '[INFO] Сlass code must have more then six symbol!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if (teacher.length !== 24) {
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
  async delete(req, res, next) {
    try {
      const { className, code, teacher } = req.body

      req.errors = []

      if (!className) {
        req.errors.push({
          message: '[INFO] Please enter a name!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      if (!code) {
        req.errors.push({
          message: '[INFO] Please enter a code!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      if (teacher.length !== 24) {
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
  async get_class(req, res, next) {
    try {
      const { id } = req.body

      req.errors = []

      if (id.length !== 24) {
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
}

module.exports = new ClassValidator()
