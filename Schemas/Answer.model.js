const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    _id: Number,
    qID: Number, 
    answers: [Number],
    true_answer: Number
  },
  { timestamps: true }
);

const Answer = mongoose.model("answer", answerSchema);
module.exports = answerSchema;
