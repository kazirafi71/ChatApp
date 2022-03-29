const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
    },
    isGroupChat: { 
      type: Boolean,
      default: false,
    },

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    latestMsg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
