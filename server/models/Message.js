import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // User ID or 'Admin'
    required: true
  },
  receiver: {
    type: String, // 'Admin' or User ID
    required: true
  },
  senderName: String,
  message: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  room: {
    type: String,
    required: true // Usually the customer's userId
  }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
