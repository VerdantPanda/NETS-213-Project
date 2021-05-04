const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    id: String, 
    time_entered: [Date], 
    time_left: [Date], 
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
