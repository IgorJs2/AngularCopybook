const SignalService = require('../service/signal-service')

class SignalController {
  async cr_signals(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { name_st, title, text, id } = req.body
      const data = await SignalService.cr_signals(name_st, title, text, id)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async gt_signals(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { id } = req.body
      const data = await SignalService.gt_signals(id)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
  async del_signals(req, res) {
    try {
      const errors = req.errors

      if (errors[0]) {
        return res.status(400).json(errors[0])
      }
      const { signal } = req.body
      const data = await SignalService.del_signals(signal)

      return res.status(data.code).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: '[INFO] Server error' })
    }
  }
}

module.exports = new SignalController()
