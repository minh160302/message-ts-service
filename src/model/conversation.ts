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
  members: Array<User>;
  createdAt: string;
  sharedMedia?: Array<any>;
}

const conversation = new Schema<ConversationType>({
  _id: {
    type: String,
  },
  members: [{
    user_id: String,
    username: String,
    profile_picture: String,
    _id: false,
  }],
  created_at: {
    type: String,
    required: true
  },
  shared_media: [{
    type: String,
    required: false
  }],
  status: {
    type: String,
    required: true
  }
})

// create conversation model
const Conversation = model<ConversationType>("Conversation", conversation, "conversation");

export default Conversation;