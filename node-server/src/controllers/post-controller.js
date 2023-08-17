import * as definitionsDao from "../models/definitions-dao.js";
import * as favoritesDao from "../models/favorites-dao.js";

const PostController = (app) => {
  const getHomePosts = (req, res) => {
    const out = definitionsDao.findAllDefinitions();
    return res.json(out);
  };

  const getSearchPosts = (req, res) => {
    return res.json({}); // TODO: use external API to get some posts
  };

  const deletePost = (req, res) => {
    const post = definitionsDao.findDefinitionById(req.query.id);
    const user = req.session["currentUser"];

    if (!(user.moderator || post.user === user.userName)) {
      return res.sendStatus(401); // unauthorized
    }

    definitionsDao.deleteDefinition(post.id);
    return res.sendStatus(200);
  };

  const createPost = (req, res) => {
    const post = req.body;
    definitionsDao.createDefinition(post);
    return res.sendStatus(200);
  };

  app.get("/api/home", getHomePosts);
  app.get("/api/search", getSearchPosts);
  app.delete("/api/posts/delete", deletePost);
  app.post("/api/posts/create", createPost);
};

export default PostController;
