const { model, Types, Schema } = require('mongoose')

const schema = new Schema({
  students: { type: String, required: true, unique: false },
  attendance: { type: Boolean, required: false, unique: false },
  type: { type: String, required: true, unique: false },
  grade: { type: String, required: true, unique: false },
  date: { type: String, required: false, unique: false },
  description: { type: String, required: true, unique: false },
  class: { type: String, required: true, unique: false },
})

module.exports = model('Grades', schema)
