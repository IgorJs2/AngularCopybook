const User = require('../models/User')
const Materials = require('../models/Materials')
const Homeworks = require('../models/Homeworks')
const Status = require('../models/Status')
const Class = require('../models/Class')

class StatusService {
  async st_status(student, object, status, name, class_) {
    try {
      if (!student) {
        return {
          message: '[INFO] Student not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      if (!object && !name) {
        return {
          message: '[INFO] Object not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      if (!status) {
        return {
          message: '[OPTIONS] Status not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const StudentDb = await User.findById(student)
      const HomeworkDb = await Homeworks.findById(object)
      const MaterialDb = await Materials.findById(object)

      let objectDb
      let type

      if (HomeworkDb) {
        objectDb = HomeworkDb
        type = 'HOMEWORK'
      } else if (MaterialDb) {
        objectDb = MaterialDb
        type = 'MATERIAL'
      } else {
        return { message: '[OPTIONS] Not find object', code: 400 }
      }

      const StatusDb = new Status({
        student,
        object: objectDb.name,
        type,
        status,
        class: class_,
      })

      await StatusDb.save()

      return { message: '[OPTIONS] Success saved', code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async gt_status(student, object, class_) {
    try {
      const StudentDb = await User.findById(student)

      if (!StudentDb) {
        return {
          message: '[INFO] Student not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const UserStatusArray = await Status.find({ student })

      const ClassDb = await Class.findById(class_)
      if (ClassDb) {
        const HomeworksAll = await Homeworks.find({ class: class_ })
        HomeworksAll.map(async (elem) => {
          let check = false
          UserStatusArray.map(async (element, i) => {
            if (element.object === elem.name) {
              check = true
            }
          })
          if (
            Date.parse(elem.expire_date) < Date.now() &&
            !check &&
            StudentDb.role !== 'Teacher'
          ) {
            const StatusExpired = new Status({
              student,
              object: elem.name,
              type: 'HOMEWORK',
              status: 'EXPIRED',
              class: class_,
            })

            await StatusExpired.save()
          }
        })
      }

      const UserStatus = await Status.find({ student, class: class_ })

      let ResponseArray = []

      UserStatus.map(async (elem, i) => {
        if (elem.type === object) {
          if (elem.student_login) {
            ResponseArray.push({
              name: elem.object,
              status: elem.status,
              student_login: elem.student_login,
            })
          } else {
            ResponseArray.push({ name: elem.object, status: elem.status })
          }
        }
      })

      return { ResponseArray, code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
}

module.exports = new StatusService()
