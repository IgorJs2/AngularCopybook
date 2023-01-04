const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: false },
  date: { type: String, required: true, unique: false },
  filename: { type: String, required: true, unique: false },
  class: { type: String, required: true, unique: false },
});

module.exports = model("Materials", schema);
