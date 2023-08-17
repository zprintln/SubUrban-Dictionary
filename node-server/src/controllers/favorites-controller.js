import * as favoritesDao from "../models/favorites-dao.js";

const FavoritesController = (app) => {
  const getFavorites = async (req, res) => {
    const user = req.session["currentUser"];
    const favorites = await favoritesDao.findFavoritesByUser(user);
    return res.json(favorites);
  };

  const createFavorite = async (req, res) => {
    const post = await definitionsDao.findDefinitionById(req.query.id);
    if (post) {
      return res.sendStatus(500); // post is already saved
    }

    const currentUser = req.session["currentUser"];
    await favoritesDao.createFavorite({ post: post, user: currentUser });
    return res.sendStatus(200);
  };

  const deleteFavorite = async (req, res) => {
    await definitionsDao.deleteFavorite(req.query.id);
    return res.sendStatus(200);
  };

  app.get("/api/favorites", getFavorites);
  app.post("/api/favorites", createFavorite);
  app.delete("/api/favorites", deleteFavorite);
};

export default FavoritesController;
