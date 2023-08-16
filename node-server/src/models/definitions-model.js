import mongoose from "mongoose";
import definitionsSchema from './definitions-schema.js'
const definitionsModel = mongoose.model("Definitions", definitionsSchema);
export default definitionsModel;
