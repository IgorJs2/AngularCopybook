const Grades = require('../models/Grades')
const User = require('../models/User')
const Homeworks = require('../models/Homeworks')
const Status = require('../models/Status')
const Class = require('../models/Class')

class GradeService {
  async gr_create(
    choosenStudent,
    attendance,
    grade,
    date,
    description,
    type,
    class_,
  ) {
    try {
      if (choosenStudent && !choosenStudent[0]) {
        return {
          message: '[INFO] Please choose students or student!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      if (!date) {
        return {
          message: '[INFO] Please choose date!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      if (!description) {
        return {
          message: '[INFO] Please write description!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      if (attendance) {
        choosenStudent.map(async (elem) => {
          const Student = await User.findOne({ login: elem })
          const AttendanceCheck = await Grades.findOne({
            grade: 'NONE',
            students: Student._id,
            date: new Date().toLocaleDateString(),
          })

          if (!AttendanceCheck) {
            const gradeDB = new Grades({
              students: Student._id,
              attendance,
              type: 'ATTENDANCE',
              grade: 'NONE',
              date,
              description: 'NONE',
              class: class_,
            })

            await gradeDB.save()
          }
        })
      }

      if (type) {
        if (grade < 1 || grade > 12) {
          return {
            message: '[INFO] Enter grade from 1 to 12!',
            flag: '#EAC15A',
            code: 400,
          }
        }
        choosenStudent.map(async (elem) => {
          const Student = await User.findOne({ login: elem })

          const gradeDB = new Grades({
            students: Student._id,
            attendance: null,
            type,
            grade,
            date,
            description,
            class: class_,
          })

          await gradeDB.save()
        })

        return {
          message: '[INFO] Grades was maked!',
          flag: '#66D9BD',
          code: 200,
        }
      }

      if (attendance) {
        return {
          message: '[INFO] Attendance saved!',
          flag: '#66D9BD',
          code: 200,
        }
      }
    } catch (error) {
      console.log(error)
      return { message: '[INFO] Server error', code: 500 }
    }
  }
  async es_homework(
    choosenStudent,
    grade,
    description,
    name_homework,
    student,
    class_,
  ) {
    try {
      for (let i = 0; i < choosenStudent.length; i++) {
        const Student = await User.findOne({ login: choosenStudent[i] })
        const StatusCheck = await Status.findOne({ object: name_homework })
        const ClassDb = await Class.findById(class_)

        if (Student && StatusCheck && ClassDb) {
          const gradeDB = new Grades({
            students: Student._id,
            attendance: null,
            type: 'HOMEWORK',
            grade,
            date: new Date().toLocaleDateString(),
            description,
            class: class_,
          })
          const statusUpdateStudent = await Status.findOne({
            object: name_homework,
            student: Student._id,
            status: 'CHECKING',
          })
          const statusUpdateTeacher = await Status.findOne({
            object: name_homework,
            student: ClassDb.teacher,
            status: 'CHECKING',
            student_login: { $exists: false },
          })

          if (statusUpdateStudent && statusUpdateTeacher) {
            statusUpdateStudent.status = 'REVIEWED' + ' ' + grade
            statusUpdateTeacher.student_login = Student.login
            statusUpdateTeacher.status = 'REVIEWED' + ' ' + grade

            await statusUpdateStudent.save()
            await statusUpdateTeacher.save()
            await gradeDB.save()
          }
        }
      }

      return {
        message: '[INFO] Homework rated',
        flag: '#66D9BD',
        code: 201,
      }
    } catch (e) {
      return { message: '[INFO] Server error please try again!', code: 500 }
    }
  }
  async homework_to_es(student, filename, name, id) {
    try {
      const ClassDb = await Class.findById(id)
      const StudentDb = await User.findById(student)
      const statusUpdateStudent = await Status.findOne({
        object: name,
        student,
      })

      if (StudentDb && ClassDb) {
        const Homework = new Homeworks({
          student: StudentDb.login,
          name,
          date: new Date().toLocaleDateString(),
          expire_date: 'NONE',
          filename,
          class: id,
        })
        const StatusTcDb = new Status({
          student: ClassDb.teacher,
          object: name,
          type: 'HOMEWORK',
          status: 'CHECKING',
          class: id,
        })
        if (statusUpdateStudent) {
          statusUpdateStudent.status = 'CHECKING'
          await statusUpdateStudent.save()
        } else {
          const StatusDb = new Status({
            student: StudentDb._id,
            object: name,
            type: 'HOMEWORK',
            status: 'CHECKING',
            class: id,
          })
          await StatusDb.save()
        }
        await Homework.save()
        await StatusTcDb.save()
        return { message: '[INFO] Homework rated', flag: '#66D9BD', code: 201 }
      }

      return { message: '[INFO] Error please try again', code: 400 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async get_grades(id, class_, user) {
    const GradeDb = await Grades.find({ class: class_ })

    if (user === 'Student' && GradeDb) {
      let finalArray = []

      GradeDb.map((elem) => {
        if (elem.students === id) {
          finalArray.push({
            Theme: elem.description,
            date: elem.date,
            grade: elem.grade,
            type: elem.type,
          })
        }
      })
      return {
        data: finalArray.sort((a, b) =>
          Date.parse(a.date) > Date.parse(b.date) ? 1 : -1,
        ),
        code: 200,
      }
    }
    if (user === 'Teacher' && GradeDb) {
      let finalArray = []

      await Promise.all(
        GradeDb.map(async (elem) => {
          let UserDb = await User.findById(elem.students)

          finalArray.push({
            Theme: elem.description,
            date: elem.date,
            grade: elem.grade,
            type: elem.type,
            student: UserDb.login,
          })
        }),
      )

      return {
        data: finalArray.sort((a, b) =>
          Date.parse(a.date) > Date.parse(b.date) ? 1 : -1,
        ),
        code: 200,
      }
    }
  }
}

module.exports = new GradeService()
