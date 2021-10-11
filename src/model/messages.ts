import { model, Schema } from "mongoose";

export interface SingleMsgType {
  senderId: string;
  content: any;
  createdAt: string;
  isSeen: boolean;
  isDeleted: boolean;
}

export interface MessagesType {
  _id: string;
  messages: Array<SingleMsgType>;
  conversationId: string;
}

const messages = new Schema<MessagesType>({
  messages: [{
    senderId: {
      type: String,
      required: true
    },
    content: {
      type: Schema.Types.Mixed,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    isSeen: {
      type: Boolean,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true
    },
    _id: false,
  }],
  conversationId: {
    type: String,
    required: true
  },
})

// create conversation model
const Messages = model<MessagesType>("Messages", messages, "messages");

export default Messages;