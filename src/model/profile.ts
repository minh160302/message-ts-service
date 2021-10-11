import { model, Schema } from "mongoose";

interface ConversationType {
  conversationId: string;
  lastUpdated: string;
}

interface ProfileType {
  id: string;
  username: string;
  conversations: Array<ConversationType>
}


const user = new Schema<ProfileType>({
  _id: {
    type: String,
  },
  username: {
    type: String,
    required: true
  },
  conversations: [
    {
      conversation_id: String,
      last_updated: String,
      _id: false
    }
  ]
})

const Profile = model("Profile", user, "profiles")

export default Profile;