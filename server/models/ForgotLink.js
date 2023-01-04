const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  link: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: false },
})

module.exports = model('ForgotLink', schema)
