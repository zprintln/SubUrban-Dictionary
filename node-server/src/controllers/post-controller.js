import * as definitionsDao from "../models/definitions-dao.js";
import * as favoritesDao from "../models/favorites-dao.js";

const PostController = (app) => {
  const getHomePosts = async (req, res) => {
    const out = await definitionsDao.findAllDefinitions();
    return res.json(out);
  };

  const getSearchPosts = async (req, res) => {
    const word = req.query.word;
    const out = await definitionsDao.findAllDefinitionsByWordContains(word);

    return res.json(out);
  };

  const getMyPosts = async (req, res) => {
    const out = await definitionsDao.findAllDefinitionsByUser(req.query.user);

    return res.json(out);
  };

  const deletePost = async (req, res) => {
    const post = await definitionsDao.findDefinitionById(req.query.id);
    const user = req.session["currentUser"];

    if (!(user.moderator || post.user === user.username)) {
      return res.sendStatus(401); // unauthorized
    }

    await definitionsDao.deleteDefinition(post.id);
    return res.sendStatus(200);
  };

  const createPost = async (req, res) => {
    await definitionsDao.createDefinition(req.body);
    return res.sendStatus(200);
  };

  app.get("/api/home", getHomePosts);
  app.get("/api/search", getSearchPosts);
  app.get("/api/my-posts", getMyPosts);
  app.delete("/api/posts/delete", deletePost);
  app.post("/api/posts/create", createPost);
};

export default PostController;
