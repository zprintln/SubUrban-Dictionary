import * as usersDao from "../models/users-dao.js";

const AuthController = (app) => {
  const register = async (req, res) => {
    const username = req.body.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      console.log("User with username " + username + " already exists");
      res.sendStatus(500); // user already exists for that username
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(500);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log(req.session);
    if (!currentUser) {
      res.sendStatus(500);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    await req.session.destroy();
    res.sendStatus(200);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
};
export default AuthController;
