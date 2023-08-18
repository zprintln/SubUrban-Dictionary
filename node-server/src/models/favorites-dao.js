import favoritesModel from "./favorites-model.js";

export const findAllFavorites = () => favoritesModel.find();

export const findFavoritesByUser = (user) =>
  favoritesModel.find({ user: user });

export const findFavoritesByPost = (post) =>
  favoritesModel.find({ definition: post });

export const findFavoriteByPostAndUser = (post, user) =>
  favoritesModel.findOne({ definition: post, user: user });

export const createFavorite = (favorite) => favoritesModel.create(favorite);

export const deleteFavorite = (id, user) => favoritesModel.deleteOne({ definition: id, user: user });
