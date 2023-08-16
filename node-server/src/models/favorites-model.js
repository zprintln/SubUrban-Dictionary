import mongoose from "mongoose";
import favoritesSchema from './favorites-schema.js'
const favoritesModel = mongoose.model("Favorites", favoritesSchema);
export default favoritesModel;
