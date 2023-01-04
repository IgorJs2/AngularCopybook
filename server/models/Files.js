const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  originalname: { type: String, required: true, unique: false },
  mimetype: { type: String, required: true, unique: false },
  destination: { type: String, required: true, unique: false },
  filename: { type: String, required: true, unique: false },
  path: { type: String, required: true, unique: false },
  size: { type: Number, required: true, unique: false },
});

module.exports = model("Files", schema);
