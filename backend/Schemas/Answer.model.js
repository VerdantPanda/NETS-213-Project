const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    _id: Number,
    qID: Number, 
    answer: Number
  },
  { timestamps: true }
);

const Answer = mongoose.model("answer", answerSchema);
module.exports = Answer;
