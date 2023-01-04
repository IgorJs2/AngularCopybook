const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  teacher: { type: String, required: true, unique: false },
  teacherLogin: { type: String, required: true, unique: false },
  code: { type: String, required: true, unique: false },
  name: { type: String, required: true, unique: false },
  nb_of_student: { type: Number, required: true, unique: false },
  student: { type: Array, required: true, unique: false },
});

module.exports = model("Class", schema);
