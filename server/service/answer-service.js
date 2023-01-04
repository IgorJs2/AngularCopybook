const User = require('../models/User')
const Class = require('../models/Class')
const Answers = require('../models/Answers')
const Signals = require('../models/Signals')

class AnswerService {
  async get_answers(user, class_) {
    try {
      const UserDb = await User.findById(user)

      if (!UserDb) {
        return {
          message: '[INFO] UserModel not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const findAnswers = await Answers.find({
        student: UserDb.login,
        class: class_,
      })

      return { code: 200, info: findAnswers }
    } catch (e) {
      return { code: 500, message: '[INFO] Server error!' }
    }
  }

  async get_answer(user, class_, title) {
    try {
      const UserDb = await User.findById(user)

      if (!UserDb) {
        return {
          message: '[INFO] UserModel not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const findAnswer = await Answers.findOne({
        signal: title,
        class: class_,
      })

      return { code: 200, info: findAnswer }
    } catch (e) {
      return { code: 500, message: '[INFO] Server error!' }
    }
  }

  async create_answer(answer, class_, teacher, signal, student) {
    try {
      const signals_check = await Signals.findOne({ title: signal })
      const class_check = await Class.findOne({ _id: class_ })
      const teacher_check = await User.findOne({ _id: teacher })
      const student_check = await User.findOne({ login: student })

      if (!signals_check) {
        return {
          message: '[INFO] Signals not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      if (!class_check) {
        return {
          message: '[INFO] Class not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      if (!teacher_check) {
        return {
          message: '[INFO] Teacher not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }
      if (!student_check) {
        return {
          message: '[INFO] Student not found!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const date = new Date()

      const answerObj = new Answers({
        teacher,
        student,
        answer,
        signal,
        class: class_,
        date: date.toLocaleDateString(),
      })

      await answerObj.save()

      return { message: '[INFO] Answer send!', flag: '#66D9BD', code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
}

module.exports = new AnswerService()
