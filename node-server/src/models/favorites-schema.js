import mongoose from "mongoose";
const favoritesSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    user: { type: String, required: true },
    definition: { type: Number, required: true },
  },
  { collection: "favorites" }
);
export default favoritesSchema;
