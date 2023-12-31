import mongoose from "mongoose";
const definitionsSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    definition: { type: String, required: true },
    example: { type: String },
    user: { type: String, required: true },
    posted_at: { type: Date, required: true },
  },
  { collection: "definitions" }
);
export default definitionsSchema;
