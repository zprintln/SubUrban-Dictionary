import * as definitionsDao from "../models/definitions-dao.js";
import * as usersDao from "../models/users-dao.js";
import axios from "axios";

const PostController = (app) => {
  const getPost = async (req, res) => {
    const out = await definitionsDao.findDefinitionById(req.query.id);
    return res.json(out);
  };

  const getHomePosts = async (req, res) => {
    const out = await definitionsDao.findAllDefinitions();
    return res.json(out);
  };

  const getSearchPosts = async (req, res) => {
    const word = req.query.word;
    if (word === "") return res.json([]);

    const url = `http://api.urbandictionary.com/v0/define?term=${word}`;

    try {
      const response = await axios.get(url);

      let definitionsList = response.data.list.map((entry) => ({
        word: entry.word,
        definition: entry.definition,
        example: entry.example,
        user: entry.author, // Renamed from "author" to "user"
        posted_at: new Date(entry.written_on), // Renamed from "written_on" to "posted_at"
      }));

      return Promise.all(
        definitionsList.map((x) => definitionsDao.createDefinition(x))
      ).then(values => {
        return res.json(values);
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the definitions" });
    }
  };

  const getMyPosts = async (req, res) => {
    const out = await definitionsDao.findAllDefinitionsByUser(req.query.user);

    return res.json(out);
  };

  const deletePost = async (req, res) => {
    const post = await definitionsDao.findDefinitionById(req.query.id);
    const user = await usersDao.findUserByUsername(req.query.user);

    if (!(user.moderator || post.user === user.username)) {
      return res.sendStatus(401); // unauthorized
    }

    await definitionsDao.deleteDefinition(post._id);
    return res.sendStatus(200);
  };

  const createPost = async (req, res) => {
    await definitionsDao.createDefinition(req.body.word);
    return res.sendStatus(200);
  };

  app.get("/api/word-details", getPost);
  app.get("/api/home", getHomePosts);
  app.get("/api/search", getSearchPosts);
  app.get("/api/my-posts", getMyPosts);
  app.delete("/api/posts", deletePost);
  app.post("/api/posts/create", createPost);
};

export default PostController;
