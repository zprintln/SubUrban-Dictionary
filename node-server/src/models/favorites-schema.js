import mongoose from "mongoose";
const favoritesSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    definition: { type: String, required: true },
  },
  { collection: "favorites" }
);
export default favoritesSchema;
