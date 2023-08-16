import favoritesModel from "./favorites-model.js";

export const findAllFavorites = () => favoritesModel.find();

export const findFavoritesByUser = (user) =>
  favoritesModel.find({ user: user.username });

export const findFavoritesByPost = (post) =>
  favoritesModel.find({ post: post });

export const findFavoriteByPostAndUser = (post, user) =>
  favoritesModel.findOne({ post: post, user: user.username });

export const createFavorite = (favorite) => favoritesModel.create(favorite);

export const deleteFavorite = (id) => favoritesModel.deleteOne({ id: id });
