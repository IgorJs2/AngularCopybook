class SignalValidator {
  async cr_signals(req, res, next) {
    try {
      const { name_st, title, text, id } = req.body

      req.errors = []

      if ((title && title.length < 4) || !title) {
        req.errors.push({
          message: '[INFO] Title must have more then four symbol!',
          flag: '#EAC15A',
          http: 400,
        })
      }
      if ((text && text.length < 6) || !text) {
        req.errors.push({
          message: '[INFO] Text must have more then six symbol!',
          flag: '#EAC15A',
          http: 400,
        })
      }

      next()
    } catch (error) {
      console.log(error)
      next()
    }
  }
  async gt_signals(req, res, next) {
    try {
      const { id } = req.body

      req.errors = []

      next()
    } catch (error) {
      console.log(error)
      next()
    }
  }
  async del_signals(req, res, next) {
    try {
      const { signal } = req.body

      req.errors = []

      next()
    } catch (error) {
      console.log(error)
      next()
    }
  }
}

module.exports = new SignalValidator()
