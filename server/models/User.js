const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  login: { type: String, required: true },
  role: { type: String, required: true },
  nb_of_classes: { type: Number, required: true },
  classes: { type: Array, required: true },
});

module.exports = model("User", schema);
