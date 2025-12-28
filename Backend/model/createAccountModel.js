const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLogin:{
    type: Boolean,
    required: true,
    }
});

module.exports = mongoose.model("NewAccount", accountSchema);
