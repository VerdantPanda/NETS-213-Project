const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    _id: Number,
    time_entered: {
      type: Date,
      default: Date.now
    }, 
    time_left: {
      type: Date,
      default: Date.now
    }, 
    qs_answered: [Number]
  },
  { timestamps: true }
);

const Worker = mongoose.model("worker", workerSchema);
module.exports = Worker;
