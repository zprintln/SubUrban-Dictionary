import mongoose from "mongoose";
const definitionsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    word: { type: String, required: true },
    definition: { type: String, required: true },
    example: { type: String, required: true },
    user: { type: String, required: true },
    posted_at: { type: Date, required: true },
  },
  { collection: "definitions" }
);
export default definitionsSchema;
