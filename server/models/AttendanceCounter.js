const { Schema, model } = require('mongoose')

const schema = new Schema({
  class: { type: String, required: true, unique: false },
  counter: { type: Array, required: true, unique: false },
  dateUpdate: { type: String, required: true, unique: false },
})

module.exports = model('AttendanceCounter', schema)
