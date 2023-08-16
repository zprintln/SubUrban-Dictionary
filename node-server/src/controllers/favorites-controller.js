import * as favoritesDao from "../models/favorites-dao.js";

const FavoritesController = (app) => {
  const getFavorites = (req, res) => {
    const user = req.session["currentUser"];
    const favorites = favoritesDao.findFavoritesByUser(user);
    return res.json(favorites);
  };

  const updateFavorite = (req, res) => {
    const post = definitionsDao.findDefinitionById(req.query.id);
    const saved = req.query.saved;
    const currentUser = req.session["currentUser"];

    if (!post) {
      return res.sendStatus(500);
    }

    const favoriteRow = favoritesDao.findFavoriteByPostAndUser(
      post,
      currentUser
    );

    if (favoriteRow && !saved) {
      favoritesDao.deleteFavorite(favoriteRow.id);
    } else if (!favoriteRow) {
      favoritesDao.createFavorite({ post: post, user: currentUser });
    }

    return res.sendStatus(200);
  };

  app.get("/api/favorites", getFavorites);
  app.post("/api/posts/saved", updateFavorite);
};

export default FavoritesController;
