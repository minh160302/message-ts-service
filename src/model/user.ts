import { model, Schema } from "mongoose";

// const Schema = mongoose.Schema;

interface UserType {
  id: string;
  username: string;
  profile_picture: string;
  password: string;
  first_name: string;
  last_name: string;
  roles: Array<any>;
}


const user = new Schema<UserType>({
  _id: {
    type: String,
  },
  username: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
})

const User = model("User", user, "users")

export default User;