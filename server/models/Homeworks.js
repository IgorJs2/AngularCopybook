const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true, unique: false },
  student: { type: String, required: false, unique: false },
  date: { type: String, required: true, unique: false },
  expire_date: { type: String, required: true, unique: false },
  filename: { type: String, required: true, unique: false },
  class: { type: String, required: true, unique: false },
})

module.exports = model('Homeworks', schema)
