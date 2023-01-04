const NewsService = require('../service/news-service')

class NewsController {
  async cr_news(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { title, text, messageFile, id } = req.body
      const data = await NewsService.cr_news(title, text, messageFile, id)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }

  async gt_news(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id } = req.body
      const data = await NewsService.gt_news(id)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async dl_news(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id, class_, name } = req.body
      const data = await NewsService.dl_news(id, class_, name)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new NewsController()
