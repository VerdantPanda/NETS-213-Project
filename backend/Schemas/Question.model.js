const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    qID : Number, 
    image1: { type: String, 
              required: true },
    image2: { type: String, 
              required: true },
    true_answer: Number,
    votes : [
      {
        worker_id : String,
        answer: Number,
        comments: String, 
        time_answered: Date
      }
    ],
    vote_limit : Number,
    time: Date
  },
  { timestamps: true }
);

const Question = mongoose.model("question", questionSchema);
module.exports = questionSchema;
