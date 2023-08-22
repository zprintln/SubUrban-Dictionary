import * as favoritesDao from "../models/favorites-dao.js";
import * as definitionsDao from "../models/definitions-dao.js";
import * as usersDao from "../models/users-dao.js";

const FavoritesController = (app) => {
  const getFavorites = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.query.user);
    if (!user) return res.json([]);

    const favorites = await favoritesDao.findFavoritesByUser(user._id);
    return Promise.all(
      favorites.map((f) => {
        return definitionsDao.findDefinitionById(f.definition);
      })
    ).then((out) => {
      return res.json(out);
    });
  };

  const getIsFavorite = async (req, res) => {
    const user = req.query.user;
    const exists = await favoritesDao.findFavoriteByPostAndUser(
      req.query.id,
      user
    );
    return res.json({ saved: !!exists });
  };

  const createFavorite = async (req, res) => {
    const post = req.query.id;
    const currentUser = req.body.user;

    await favoritesDao.createFavorite({
      definition: post,
      user: currentUser,
    });
    return res.sendStatus(200);
  };

  const deleteFavorite = async (req, res) => {
    await favoritesDao.deleteFavorite(req.query.id, req.query.user);
    return res.sendStatus(200);
  };

  app.get("/api/favorites", getFavorites);
  app.post("/api/favorites", createFavorite);
  app.delete("/api/favorites", deleteFavorite);
  app.get("/api/favorites/is-saved", getIsFavorite);
};

export default FavoritesController;
