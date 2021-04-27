const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    id: String, 
    time_entered: {
      type: Date,
      default: Date.now
    }, 
    time_left: {
      type: Date,
      default: Date.now
    }, 
    qs_answered: [
      {
        id: Number, 
        time: Date, 
        answer: Number
      }
    ]
  },
  { timestamps: true }
);

const Worker = mongoose.model("worker", workerSchema);
module.exports = workerSchema;
