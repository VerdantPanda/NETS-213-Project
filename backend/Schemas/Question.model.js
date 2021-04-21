const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    _id: Number,
    qID : Number, 
    image1: { type: Buffer, 
              required: true },
    image2: { type: Buffer, 
              required: true },
    time: Date
  },
  { timestamps: true }
);

const Question = mongoose.model("question", questionSchema);
module.exports = Question;
