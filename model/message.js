import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    //ok
    room: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "messages", //  CORRECT spelling: 'collection' not 'collation'
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
