const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  teacher: { type: String, required: true, unique: false },
  student: { type: String, required: true, unique: false },
  answer: { type: String, required: true, unique: false },
  signal: { type: String, required: true, unique: false },
  class: { type: String, required: true, unique: false },
  date: { type: String, required: true, unique: false },
});

module.exports = model("Answers", schema);
