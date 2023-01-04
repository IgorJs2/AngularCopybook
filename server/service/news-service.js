const User = require('../models/User')
const Class = require('../models/Class')
const News = require('../models/News')

class NewsService {
  async cr_news(title, text, messageFile, id) {
    try {
      const news_check = await News.findOne({ title })

      if (news_check) {
        return { message: '[INFO] Duplicate news!', flag: '#EAC15A', code: 400 }
      }

      const date = new Date()

      const news = new News({
        title,
        text,
        file: messageFile,
        class: id,
        date: date.toLocaleDateString(),
      })

      await news.save()

      return { message: '[INFO] News created!', flag: '#66D9BD', code: 200 }
    } catch (e) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
  async gt_news(id) {
    try {
      if (id.title) {
        const findNewsByTitle = await News.findOne({ title: id.title })
        return { findNewsByTitle, code: 200 }
      } else if (id) {
        const findNews = await News.find({ class: id })
        return { findNews, code: 200 }
      } else {
        return {
          message: '[OPTIONS] News get error!',
          flag: '#EAC15A',
          code: 400,
        }
      }
    } catch (e) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
  async dl_news(id, class_, name) {
    try {
      if (!name) {
        return {
          message: '[OPTIONS] Not found news!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      const UserDb = await User.findById(id)
      const ClassDb = await Class.findById(class_)

      if (UserDb && ClassDb && UserDb.role === 'Teacher') {
        const NewsDb = await News.find({ title: name, class: class_ })
        if (NewsDb && NewsDb[0]) {
          await News.deleteOne({ title: name, class: class_ })
          return { message: '[INFO] News deleted!', flag: '#66D9BD', code: 200 }
        } else {
          return {
            message: '[OPTIONS] News not found!',
            flag: '#EAC15A',
            code: 400,
          }
        }
      } else {
        return {
          message: '[INFO] Not correct data!',
          flag: '#EAC15A',
          code: 400,
        }
      }
    } catch (e) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
}

module.exports = new NewsService()
