const mongoose = require("mongoose");
const User = require("./User");

const requestSchema = new mongoose.Schema({
  sentRequest: [
    {
      username: {
        type: String,
      },
    },
  ],
  recieved: [
    {
      username: {
        type: String,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  friendList: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      friendName: String,
    },
  ],
  totalRequest: {
    type: Number,
  },
});
