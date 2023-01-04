const { Schema, model } = require("mongoose");

const schema = new Schema({
  name_st: { type: String, required: true, unique: false },
  title: { type: String, required: true, unique: false },
  text: { type: String, required: true, unique: false },
  class: { type: String, required: true, unique: false },
  date: { type: String, required: true, unique: false },
});

module.exports = model("Signals", schema);
