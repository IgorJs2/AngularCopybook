class NewsValidator {
  async cr_news(req, res, next) {
    try {
      if (req.method === 'OPTIONS') {
        return next()
      }

      const { title, text, messageFile, id } = req.body

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
    }
  }

  async gt_news(req, res, next) {
    try {
      const { id } = req.body

      req.errors = []

      next()
    } catch (error) {
      console.log(error)
    }
  }
  async dl_news(req, res, next) {
    try {
      const { id, class_, name } = req.body

      req.errors = []

      if (class_.length !== 24 || id.length !== 24) {
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

module.exports = new NewsValidator()
