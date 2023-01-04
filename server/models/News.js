const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: false },
  text: { type: String, required: true, unique: false },
  file: { type: String, required: false, unique: false },
  class: { type: String, required: true, unique: false },
  date: { type: String, required: true, unique: false },
});

module.exports = model("News", schema);
