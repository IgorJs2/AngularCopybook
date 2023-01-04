const { Schema, model } = require('mongoose')

const schema = new Schema({
  student: { type: String, required: true, unique: false },
  student_login: { type: String, required: false, unique: false },
  object: { type: String, required: true, unique: false },
  type: { type: String, required: true, unique: false },
  status: { type: String, required: true, unique: false },
  class: { type: String, required: true, unique: false },
})

module.exports = model('Status', schema)
