const User = require('../models/User')
const Class = require('../models/Class')
const Signals = require('../models/Signals')

class SignalService {
  async cr_signals(name_st, title, text, id) {
    try {
      const signals_check = await Signals.findOne({ title })

      if (signals_check) {
        return {
          message: '[INFO] Duplicate signals!',
          flag: '#EAC15A',
          code: 400,
        }
      }

      const date = new Date()

      const signals = new Signals({
        name_st,
        title,
        text,
        class: id,
        date: date.toLocaleDateString(),
        answer: '',
      })

      await signals.save()

      return { message: '[INFO] Signals send!', flag: '#66D9BD', code: 200 }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async gt_signals(id) {
    try {
      const findSignals = await Signals.find({ class: id })
      if (findSignals[0]) {
        return { findSignals, code: 200 }
      } else {
        const findSignalsByTitle = await Signals.findOne({ title: id })
        return { findSignalsByTitle, code: 200 }
      }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
  async del_signals(signal) {
    try {
      const Signal = await Signals.find({ title: signal })
      if (Signal) {
        await Signals.deleteOne({ title: signal })
        return {
          message: '[INFO] Signals deleted.',
          flag: '#66D9BD',
          code: 200,
        }
      }
    } catch (e) {
      console.log(e)
      return { message: '[INFO] Server error!', code: 500 }
    }
  }
}

module.exports = new SignalService()
