const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    _id: Number,
    participantId1: { type: Number, required: true },
    participantId2: { type: Number, required: true },
    messages: { type: Array, default: [], required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;
