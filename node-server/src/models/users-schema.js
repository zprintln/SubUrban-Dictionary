import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    moderator: { type: Boolean, default: false },
  },
  { collection: "users" }
);
export default usersSchema;
