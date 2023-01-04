const User = require('../models/User')
const Class = require('../models/Class')
const Homeworks = require('../models/Homeworks')
const News = require('../models/News')
const Grades = require('../models/Grades')
const Answers = require('../models/Answers')
const AttendanceCounter = require('../models/AttendanceCounter')
const Signals = require('../models/Signals')
const Materias = require('../models/Materials')
const Status = require('../models/Status')
const Files = require('../models/Files')

class ClassService {
  async class(id) {
    try {
      const findUser = await User.findById(id)
      let ClassIdArray = []

      for (let i = 0; i < findUser.classes.length; i++) {
        ClassIdArray.push(findUser.classes[i].toString())
      }

      const findClasses = await Class.find({ _id: { $in: ClassIdArray } })

      if (findClasses) {
        return { findClasses, code: 200 }
      }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async connect(code, student) {
    try {
      const Student = await User.findById(student)

      const Class_ = await Class.findOne({ code })

      if (!Class_) {
        return {
          message: '[INFO] Class not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      if (Student.classes.length === 3) {
        return {
          message: '[INFO] Class limit exceeded!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      if (Student.classes.length !== 0) {
        for (let i = 0; i < Student.classes.length; i++) {
          let validate = await Class.findById(Student.classes[i])
          if (validate.code === code) {
            return {
              message: '[INFO] You already in this class!',
              flag: '#EAC15A',
              code: 400,
            }
          }
        }
      }

      const user_classes = Student.classes
      const classId = Class_._id
      const class_student = Class_.student

      const user_array = user_classes
      user_array.push(classId)
      const class_array = class_student
      class_array.push(student)

      const userUpdate = await User.updateOne(
        { _id: student },
        {
          $set: {
            classes: user_array,
            nb_of_classes: Student.nb_of_classes + 1,
          },
        },
      )
      const classesUpdate = await Class.updateOne(
        { _id: classId.toString() },
        {
          $set: {
            student: class_array,
            nb_of_student: Class_.nb_of_student + 1,
          },
        },
      )
      return { message: '[INFO] Class connected!', flag: '#66D9BD', code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async disconnect(name, student) {
    try {
      const Student = await User.findById(student)
      const Class_ = await Class.findOne({ name })

      if (!Class_) {
        return {
          message: '[INFO] Class not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      if (Student.classes.length !== 0) {
        const validateArray = Student.classes.forEach(async (elem) => {
          const validate = await Class.findById(elem)
          if (validate.name !== name) {
            return {
              message: '[INFO]You not in this class!',
              flag: '#D1557A',
              code: 400,
            }
          }
        })
      } else {
        return {
          message: '[INFO]You not in this class!',
          flag: '#D1557A',
          code: 400,
        }
      }

      const user_classes = Student.classes
      const classId = Class_._id
      const class_student = Class_.student

      const user_array = user_classes
      const class_array = class_student

      for (let i = 0; i < class_array.length; i++) {
        if (class_array[i] === Student._id.toString()) {
          class_array.splice(i, 1)
        }
      }

      for (let i = 0; i < user_array.length; i++) {
        if (user_array[i].toString() === Class_._id.toString()) {
          user_array.splice(i, 1)
        }
      }

      const userUpdate = await User.updateOne(
        { _id: student },
        {
          $set: {
            classes: user_array,
            nb_of_classes: Student.nb_of_classes - 1,
          },
        },
      )
      const classesUpdate = await Class.updateOne(
        { _id: classId.toString() },
        {
          $set: {
            student: class_array,
            nb_of_student: Class_.nb_of_student - 1,
          },
        },
      )

      return {
        message: '[INFO] Class disconnected!',
        flag: '#66D9BD',
        code: 200,
      }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async create(className, code, teacher) {
    try {
      const classValidateName = await Class.findOne({ name: className })
      const classValidateCode = await Class.findOne({ code: code })
      const user = await User.findById(teacher)

      if (classValidateName || classValidateCode) {
        return {
          message: '[INFO] Class duplicates!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const Teacher = await User.findById(teacher)

      if (Teacher.classes.length === 3) {
        return {
          message: '[INFO] Class limit exceeded!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      if (!Teacher) {
        return {
          message: '[OPTIONS] Teacher not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      const class_ = new Class({
        teacher: Teacher._id.toString(),
        teacherLogin: Teacher.login,
        code: code,
        name: className,
        nb_of_student: 0,
        student: [],
      })

      const user_array = user.classes
      user_array.push(class_._id)

      const userUpdate = await User.findOne({ _id: teacher })

      userUpdate.classes = user_array
      userUpdate.nb_of_classes += 1

      await class_.save()
      await userUpdate.save()

      return { message: '[INFO] Class saved!', flag: '#66D9BD', code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async delete(className, code, teacher) {
    try {
      const classes = await Class.findOne({ code: code, name: className })
      const user = await User.findById(teacher)

      if (!classes) {
        return {
          message: '[INFO] Class not found!',
          flag: '#D1557A',
          code: 400,
        }
      }

      for (let i = 0; i < classes.student.length; i++) {
        let StudentDb = await User.findById(classes.student[i])
        StudentDb.nb_of_classes -= 1
        StudentDb.classes = StudentDb.classes.filter(
          (elem) => elem.toString() !== classes._id.toString(),
        )
        await StudentDb.save()
      }

      const TeacherDb = await User.findById(classes.teacher)
      TeacherDb.nb_of_classes -= 1
      TeacherDb.classes = TeacherDb.classes.filter(
        (elem) => elem.toString() !== classes._id.toString(),
      )

      const HomeworksClear = await Homeworks.deleteMany({
        class: classes._id.toString(),
      })
      const NewsClear = await News.deleteMany({ class: classes._id.toString() })
      const GradesClear = await Grades.deleteMany({
        class: classes._id.toString(),
      })
      const AnswersClear = await Answers.deleteMany({
        class: classes._id.toString(),
      })
      const AttendanceCounterClear = await AttendanceCounter.deleteMany({
        class: classes._id.toString(),
      })
      const SignalsClear = await Signals.deleteMany({
        class: classes._id.toString(),
      })
      const MateriasClear = await Materias.deleteMany({
        class: classes._id.toString(),
      })
      const StatusClear = await Status.deleteMany({
        class: classes._id.toString(),
      })

      await TeacherDb.save()
      await classes.deleteOne({ code: code, name: className })

      return { message: '[INFO] Class Deleted!', flag: '#66D9BD', code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async get_class(id) {
    try {
      const classes = await Class.findById(id)

      if (!classes) {
        return {
          message: '[INFO] Class not found!',
          flag: '#D1557A',
          code: 400,
        }
      }

      return { classes, code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
}

module.exports = new ClassService()
