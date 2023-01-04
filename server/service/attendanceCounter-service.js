const AttendanceCounter = require('../models/AttendanceCounter')
const User = require('../models/User')
const Class = require('../models/Class')

class AttendanceCounterService {
  async set_count(class_, id, date) {
    try {
      const UserDb = await User.findById(id)
      const ClassDb = await Class.findById(class_)
      const AttendanceCounterDb = await AttendanceCounter.findOne({
        class: class_,
      })

      if (!UserDb) {
        return { message: '[INFO] UserModel not found!', code: 400 }
      }
      if (!ClassDb) {
        return { message: '[INFO] Class not found!', code: 400 }
      }

      if (UserDb.role === 'Student') {
        return { message: '[OPTIONS] No permission!', code: 403 }
      }

      let created = false

      if (!AttendanceCounterDb) {
        const AttendanceCounterEX = new AttendanceCounter({
          class: class_,
          counter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          dateUpdate: new Date().toLocaleDateString(),
        })

        created = true
        await AttendanceCounterEX.save()
      }

      const AttendanceCounterDbUpdate = await AttendanceCounter.findOne({
        class: class_,
      })

      const formattedData = [
        date.split('-')[2],
        date.split('-')[1],
        date.split('-')[0],
      ].join('.')

      if (formattedData === AttendanceCounterDbUpdate.dateUpdate && !created) {
        return { message: '[OPTIONS] Date already update.', code: 400 }
      }

      const counter = AttendanceCounterDbUpdate.counter.map((elem, i) => {
        if (i === Number(formattedData.split('.')[1].split('0').join('')) - 1) {
          return elem + 1
        } else {
          return elem
        }
      })

      AttendanceCounterDbUpdate.counter = counter
      AttendanceCounterDbUpdate.dateUpdate = formattedData
      await AttendanceCounterDbUpdate.save()
      return { message: '[OPTIONS] Succes!', code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
}

module.exports = new AttendanceCounterService()
