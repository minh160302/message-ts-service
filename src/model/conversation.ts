// import * as mongoose from "mongoose";

import { model, Schema } from "mongoose";

// const Schema = mongoose.Schema;

interface User {
  user_id: string;
  username: string;
  profile_picture: string;
}

// interface Administrator {
//   creator: User,
//   visitor: User
// }

export interface ConversationType {
  _id: string;
  members: Array<string>;
  createdAt: string;
  updatedAt: string;
  avatar: string,
  chatName: string,
  status: string;
}

const conversation = new Schema<ConversationType>({
  members: [{
    type: String,
    _id: false,
  }],
  created_at: {
    type: String,
    required: true
  },
  updated_at: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  chatName: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true
  }
})

// create conversation model
const Conversation = model<ConversationType>("Conversation", conversation, "conversation");

export default Conversation;