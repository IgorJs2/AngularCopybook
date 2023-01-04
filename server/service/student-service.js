const Class = require('../models/Class')
const User = require('../models/User')
const News = require('../models/News')
const Grades = require('../models/Grades')
const AttendanceCounter = require('../models/AttendanceCounter')

class StudentService {
  async gt_st(id) {
    try {
      const students = await Class.findById(id)

      if (!students) {
        return { message: '[INFO] Class not find!', flag: '#66D9BD', code: 400 }
      }

      let studentArray = []

      for (let i = 0; i < students.student.length; i++) {
        let student = await User.findById(students.student[i])
        if (student && student.login) {
          studentArray.push(student.login)
        }
      }
      return { students: studentArray, code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async get_student_data(class_, id, user) {
    try {
      const ClassDb = await Class.findById(class_)

      if (!ClassDb) {
        return {
          message: '[INFO] Class not found!',
          flag: '#66D9BD',
          code: 400,
        }
      }

      const UserDb = await User.findById(id)

      if (!UserDb) {
        return { message: '[INFO] UserModel not found!', flag: '#66D9BD', code: 400 }
      }

      if (user === 'Student') {
        var studentRateArray = []
        var studentGradeArray = []
        var check = false
        let UserRate = 0

        const GradesDb = await Grades.find({ students: id })

        for (let a = 0; a < ClassDb.student.length; a++) {
          let student = await User.findById(ClassDb.student[a])
          let gradeDb = await Grades.find({
            students: ClassDb.student[a],
            class: class_,
          })
          let RateArray = gradeDb.map((elem) => {
            if (elem.type === 'HOMEWORK') {
              return +elem.grade
            }
            if (elem.type === 'LABS') {
              return +elem.grade * 1.5
            }
            if (elem.type === 'PRACTICAL') {
              return +elem.grade * 1.5
            }
            if (elem.type === 'TEST') {
              return +elem.grade * 1.5
            }
            if (elem.type === 'EXAMINATION') {
              return +elem.grade * 2
            }
            if (elem.type === 'CLASSWORK') {
              return +elem.grade
            }
            if (elem.type === 'ATTENDANCE') {
              return 1
            }
          })
          let rate = 0
          studentRateArray.push({
            name: student.login,
            rate: RateArray.reduce(
              (previous, current) => previous + current,
              rate,
            ),
          })

          if (student._id.toString() === id) {
            UserRate = RateArray.reduce(
              (previous, current) => previous + current,
              rate,
            )
          }
        }

        for (let a = 0; a < GradesDb.length; a++) {
          if (GradesDb[a].class === class_) {
            if (GradesDb[a].attendance) {
              studentGradeArray.push({
                name: GradesDb[a].description,
                type:
                  GradesDb[a].type.charAt(0).toUpperCase() +
                  GradesDb[a].type.slice(1).toLowerCase(),
                rate: 1,
                date: GradesDb[a].date,
              })
            } else {
              studentGradeArray.push({
                name: GradesDb[a].description,
                type:
                  GradesDb[a].type.charAt(0).toUpperCase() +
                  GradesDb[a].type.slice(1).toLowerCase(),
                rate: GradesDb[a].grade,
                date: GradesDb[a].date,
              })
            }
          }
        }

        return {
          grades: studentGradeArray.sort((a, b) =>
            Date.parse(a.date) > Date.parse(b.date) ? 1 : -1,
          ),
          students: studentRateArray.sort((a, b) => (a.rate > b.rate ? -1 : 1)),
          user: UserRate,
          code: 200,
        }
      } else if (user === 'Teacher') {
        var studentRateArray = []
        var teacherNewsArray = []

        const NewsDb = await News.find({ class: class_ })

        for (let a = 0; a < ClassDb.student.length; a++) {
          let student = await User.findById(ClassDb.student[a])
          let gradeDb = await Grades.find({
            students: ClassDb.student[a],
            class: class_,
          })
          let RateArray = gradeDb.map((elem) => {
            if (elem.type === 'HOMEWORK') {
              return +elem.grade
            }
            if (elem.type === 'LABS') {
              return +elem.grade * 1.5
            }
            if (elem.type === 'PRACTICAL') {
              return +elem.grade * 1.5
            }
            if (elem.type === 'TEST') {
              return +elem.grade * 1.5
            }
            if (elem.type === 'EXAMINATION') {
              return +elem.grade * 2
            }
            if (elem.type === 'CLASSWORK') {
              return +elem.grade
            }
            if (elem.type === 'ATTENDANCE') {
              return 1
            }
          })
          let rate = 0
          studentRateArray.push({
            name: student.login,
            rate: RateArray.reduce(
              (previous, current) => previous + current,
              rate,
            ),
          })
        }

        if (NewsDb.length === 0) {
          return {
            news: teacherNewsArray.sort((a, b) =>
              Date.parse(a.date) > Date.parse(b.date) ? 1 : -1,
            ),
            students: studentRateArray,
            code: 200,
          }
        }

        for (let a = 0; a < NewsDb.length; a++) {
          if (NewsDb[a].class === class_) {
            teacherNewsArray.push({
              name: NewsDb[a].title,
              date: NewsDb[a].date,
            })
          }
        }
        return {
          news: teacherNewsArray.sort((a, b) =>
            Date.parse(a.date) > Date.parse(b.date) ? 1 : -1,
          ),
          students: studentRateArray.sort((a, b) => (a.rate < b.rate ? 1 : -1)),
          code: 200,
        }
      }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async get_chart_grade(id, class_, user) {
    try {
      const ClassDb = await Class.findById(class_)

      if (!ClassDb) {
        return {
          message: '[INFO] Class not found!',
          flag: '#66D9BD',
          code: 400,
        }
      }

      const UserDb = await User.findById(id)

      if (!UserDb) {
        return { message: '[INFO] UserModel not found!', flag: '#66D9BD', code: 400 }
      }

      const GradesDb = await Grades.find({ class: class_ })
      const AttendanceDb = await AttendanceCounter.findOne({ class: class_ })
      if (AttendanceDb) {
        const counter =
          AttendanceDb.counter.reduce((prev, curr) => prev + curr) || 0
      }

      let Chart_data_grade = []
      let Chart_data_attendance = []

      for (let a = 0; a < GradesDb.length; a++) {
        if (user === 'Teacher') {
          if (GradesDb[a].grade !== 'NONE') {
            Chart_data_grade.push({
              grade: GradesDb[a].grade,
              date: GradesDb[a].date
                .split('.')
                .reverse()
                .join('-')
                .split('-')[1]
                .split('0')
                .join(''),
            })
          } else {
            Chart_data_attendance.push({
              student: GradesDb[a].students,
              date: [
                GradesDb[a].date
                  .split('.')
                  .reverse()
                  .join('-')
                  .split('-')[1]
                  .split('0')
                  .join(''),
                GradesDb[a].date
                  .split('.')
                  .reverse()
                  .join('-')
                  .split('-')[2]
                  .split('0')
                  .join(''),
              ],
            })
          }
        } else if (user === 'Student') {
          if (GradesDb[a].grade !== 'NONE' && GradesDb[a].students === id) {
            Chart_data_grade.push({
              grade: GradesDb[a].grade,
              date: GradesDb[a].date
                .split('.')
                .reverse()
                .join('-')
                .split('-')[1]
                .split('0')
                .join(''),
            })
          } else if (GradesDb[a].students === id) {
            Chart_data_attendance.push({
              student: GradesDb[a].students,
              date: [
                GradesDb[a].date
                  .split('.')
                  .reverse()
                  .join('-')
                  .split('-')[1]
                  .split('0')
                  .join(''),
                GradesDb[a].date
                  .split('.')
                  .reverse()
                  .join('-')
                  .split('-')[2]
                  .split('0')
                  .join(''),
              ],
            })
          }
        }
      }

      let avarageGrade = 0

      avarageGrade = Math.round(
        Chart_data_grade.map((elem) =>
          elem && elem.grade ? Number(elem.grade) : 0,
        ).reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          avarageGrade,
        ) / Chart_data_grade.length,
      )

      let data = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      }

      let data2 = { ...data }

      let dataC = {
        JanC: 0,
        FebC: 0,
        MarC: 0,
        AprC: 0,
        MayC: 0,
        JunC: 0,
        JulC: 0,
        AugC: 0,
        SepC: 0,
        OctC: 0,
        NovC: 0,
        DecC: 0,
      }

      Chart_data_grade.forEach((elem) => {
        if (elem.date === '1') {
          data.Jan += Number(elem.grade)
          dataC.JanC += 1
        }
        if (elem.date === '2') {
          data.Feb += Number(elem.grade)
          dataC.FebC += 1
        }
        if (elem.date === '3') {
          data.Mar += Number(elem.grade)
          dataC.MarC += 1
        }
        if (elem.date === '4') {
          data.Apr += Number(elem.grade)
          dataC.AprC += 1
        }
        if (elem.date === '5') {
          data.May += Number(elem.grade)
          dataC.MayC += 1
        }
        if (elem.date === '6') {
          data.Jun += Number(elem.grade)
          dataC.JunC += 1
        }
        if (elem.date === '7') {
          data.Jul += Number(elem.grade)
          dataC.JulC += 1
        }
        if (elem.date === '8') {
          data.Aug += Number(elem.grade)
          dataC.AugC += 1
        }
        if (elem.date === '9') {
          data.Sep += Number(elem.grade)
          dataC.SepC += 1
        }
        if (elem.date === '10') {
          data.Oct += Number(elem.grade)
          dataC.OctC += 1
        }
        if (elem.date === '11') {
          data.Nov += Number(elem.grade)
          dataC.NovC += 1
        }
        if (elem.date === '12') {
          data.Dec += Number(elem.grade)
          dataC.DecC += 1
        }
      })

      Chart_data_attendance.forEach((elem) => {
        if (elem.date[0] === '1') {
          data2.Jan += 1
        }
        if (elem.date[0] === '2') {
          data2.Feb += 1
        }
        if (elem.date[0] === '3') {
          data2.Mar += 1
        }
        if (elem.date[0] === '4') {
          data2.Apr += 1
        }
        if (elem.date[0] === '5') {
          data2.May += 1
        }
        if (elem.date[0] === '6') {
          data2.Jun += 1
        }
        if (elem.date[0] === '7') {
          data2.Jul += 1
        }
        if (elem.date[0] === '8') {
          data2.Aug += 1
        }
        if (elem.date[0] === '9') {
          data2.Sep += 1
        }
        if (elem.date[0] === '10') {
          data2.Oct += 1
        }
        if (elem.date[0] === '11') {
          data2.Nov += 1
        }
        if (elem.date[0] === '12') {
          data2.Dec += 1
        }
      })

      Object.keys(data).map(function (elem, i) {
        data[elem] = Math.round(data[elem] / dataC[elem + 'C']) || 0
      })

      const GradeArray = Object.keys(data).map(function (elem, i) {
        return data[elem]
      })

      Object.keys(data2).map(function (elem, i) {
        if (!AttendanceDb) {
          data2[elem] = 0
        } else {
          data2[elem] =
            (data2[elem] / (AttendanceDb.counter[i] * ClassDb.student.length)) *
              100 || 0
        }
      })

      const AttendanceArray = Object.keys(data2).map(function (elem, i) {
        return data2[elem] || 0
      })

      const AvarageAttendance =
        Object.values(data2).reduce((prev, curr) => prev + curr) /
        Object.values(data2).filter((elem) => elem !== 0).length

      return {
        chartGrade: GradeArray,
        AvarageGrade: Math.round(avarageGrade),
        AvarageAttendance: Math.round(AvarageAttendance),
        chartAttendance: AttendanceArray,
        code: 200,
      }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async get_chart_type_grades(id, class_, user) {
    try {
      const ClassDb = await Class.findById(class_)

      if (!ClassDb) {
        return {
          message: '[INFO] Class not found!',
          flag: '#66D9BD',
          code: 400,
        }
      }

      const UserDb = await User.findById(id)

      if (!UserDb) {
        return { message: '[INFO] UserModel not found!', flag: '#66D9BD', code: 400 }
      }

      const GradesDb = await Grades.find({ class: class_ })
      let Chart_data = []

      let avarage = [
        {
          homework: 0,
        },
        {
          labs: 0,
        },
        {
          classwork: 0,
        },
        {
          examination: 0,
        },
        {
          test: 0,
        },
        {
          practical: 0,
        },
        {
          all: 0,
        },
      ]

      let data = [
        {
          homework: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          labs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          classwork: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          examination: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          test: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          practical: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ]

      let dataC = [
        {
          homework: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          labs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          classwork: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          examination: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          test: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          practical: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ]

      let final_data = [
        {
          label: 'Homework',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#66D9BD',
        },
        {
          label: 'Labs',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#79BBF9',
        },
        {
          label: 'Classwork',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#EAC15A',
        },
        {
          label: 'Examination',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#D1557A',
        },
        {
          label: 'Test',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#D56AFB',
        },
        {
          label: 'Practical',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#000000',
        },
      ]

      let b = []

      if (!GradesDb.every((val, index) => val === b[index])) {
        GradesDb.forEach((elem) => {
          if (user === 'Teacher') {
            if (elem.grade !== 'NONE') {
              return Chart_data.push({
                grade: elem.grade,
                date: elem.date
                  .split('.')
                  .reverse()
                  .join('-')
                  .split('-')[1]
                  .split('0')
                  .join(''),
                type: elem.type,
              })
            } else {
              return null
            }
          } else if (user === 'Student') {
            if (elem.grade !== 'NONE' && elem.students === id) {
              return Chart_data.push({
                grade: elem.grade,
                date: elem.date
                  .split('.')
                  .reverse()
                  .join('-')
                  .split('-')[1]
                  .split('0')
                  .join(''),
                type: elem.type,
              })
            } else {
              return null
            }
          }
        })

        Chart_data.forEach((elem) => {
          data[data.findIndex((element) => element[elem.type.toLowerCase()])][
            elem.type.toLowerCase()
          ][Number(elem.date) - 1] += Number(elem.grade)
          dataC[dataC.findIndex((element) => element[elem.type.toLowerCase()])][
            elem.type.toLowerCase()
          ][Number(elem.date) - 1] += 1
        })

        for (let i = 0; i < 7; i++) {
          if (i === 0) {
            data[i].homework = data[i].homework.map((elem, j) =>
              elem !== 0 ? Math.round(elem / dataC[i].homework[j]) : 0,
            )

            avarage[i].homework = Math.round(
              data[i].homework.reduce(
                (previous, current) => previous + current,
              ) / data[i].homework.filter((e) => e != 0).length,
            )
          }
          if (i === 1) {
            data[i].labs = data[i].labs.map((elem, j) =>
              elem !== 0 ? Math.round(elem / dataC[i].labs[j]) : 0,
            )
            avarage[i].labs = Math.round(
              data[i].labs.reduce((previous, current) => previous + current) /
                data[i].labs.filter((e) => e != 0).length,
            )
          }
          if (i === 2) {
            data[i].classwork = data[i].classwork.map((elem, j) =>
              elem !== 0 ? Math.round(elem / dataC[i].classwork[j]) : 0,
            )
            avarage[i].classwork = Math.round(
              data[i].classwork.reduce(
                (previous, current) => previous + current,
              ) / data[i].classwork.filter((e) => e != 0).length,
            )
          }
          if (i === 3) {
            data[i].examination = data[i].examination.map((elem, j) =>
              elem !== 0 ? Math.round(elem / dataC[i].examination[j]) : 0,
            )
            avarage[i].examination = Math.round(
              data[i].examination.reduce(
                (previous, current) => previous + current,
              ) / data[i].examination.filter((e) => e != 0).length,
            )
          }
          if (i === 4) {
            data[i].test = data[i].test.map((elem, j) =>
              elem !== 0 ? Math.round(elem / dataC[i].test[j]) : 0,
            )
            avarage[i].test = Math.round(
              data[i].test.reduce((previous, current) => previous + current) /
                data[i].test.filter((e) => e != 0).length,
            )
          }
          if (i === 5) {
            data[i].practical = data[i].practical.map((elem, j) =>
              elem !== 0 ? Math.round(elem / dataC[i].practical[j]) : 0,
            )
            avarage[i].practical = Math.round(
              data[i].practical.reduce(
                (previous, current) => previous + current,
              ) / data[i].practical.filter((e) => e != 0).length,
            )
          }
          if (i === 6) {
            avarage[i].all = Math.round(
              Chart_data.map((elem) =>
                elem && elem.grade ? Number(elem.grade) : 0,
              ).reduce(
                (previousValue, currentValue) => previousValue + currentValue,
              ) / Chart_data.length,
            )
          }
        }

        final_data = [
          {
            label: 'Homework',
            data: data[0].homework,
            borderColor: '#66D9BD',
          },
          {
            label: 'Labs',
            data: data[1].labs,
            borderColor: '#79BBF9',
          },
          {
            label: 'Classwork',
            data: data[2].classwork,
            borderColor: '#EAC15A',
          },
          {
            label: 'Exams',
            data: data[3].examination,
            borderColor: '#D1557A',
          },
          {
            label: 'Tests',
            data: data[4].test,
            borderColor: '#D56AFB',
          },
          {
            label: 'Practical',
            data: data[5].practical,
            borderColor: '#000000',
          },
        ]

        return { data: final_data, avarage, code: 200 }
      } else {
        return { data: final_data, avarage, code: 200 }
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new StudentService()
