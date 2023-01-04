const Homeworks = require('../models/Homeworks')
const User = require('../models/User')

class HomeworkService {
  async cr_homework(student, filename, name, id, date, link) {
    try {
      if (!date) {
        return {
          message: '[INFO] Please choose expire date!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      if (!filename) {
        return {
          message: '[INFO] Please choose file!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const name_check = await Homeworks.findOne({ name })

      if (name_check && !link) {
        return { message: '[INFO] Duplicate name', flag: '#EAC15A', code: 400 }
      }

      const day = new Date()

      if (!link) {
        const Homework = new Homeworks({
          name,
          date: day.toLocaleDateString(),
          expire_date: date,
          filename,
          class: id,
        })
        await Homework.save()
      }

      return { message: '[INFO] Homework send', flag: '#66D9BD', code: 200 }
    } catch (error) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
  async gt_homeworks(id, link) {
    try {
      const UserDb = await User.findById(link)

      if (UserDb.role === 'Teacher') {
        const findHomeworks = await Homeworks.find({ class: id }).sort({
          date: -1,
        })
        return { findHomeworks, code: 200 }
      } else if (UserDb.role === 'Student') {
        const findHomeworks = await Homeworks.find({
          class: id,
          expire_date: { $ne: 'NONE' },
        }).sort({
          date: -1,
        })
        return { findHomeworks, code: 200 }
      }
    } catch (e) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
  async dl_homework(name) {
    try {
      if (name) {
        await Homeworks.deleteOne({ name, student: { $ne: null } })
      }
      return { message: '[OPTIONS] Succses', code: 200 }
    } catch (e) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
}

module.exports = new HomeworkService()
