const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  question: {
    type: String,
  },
  correctAns: {
    type: String,
  },
  options:Array
});
const Question = mongoose.model("Question", questionSchema);
module.exports ={Question};
