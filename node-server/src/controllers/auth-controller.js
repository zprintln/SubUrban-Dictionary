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

  const checkUserExistence = async (req, res) => {
    const username = req.params.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  };

  const updateUserInfo = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.params.username);
    const updatedUserInfo = req.body;
    if (await usersDao.findUserByUsername(updateUserInfo.username)) {
      return res.json(500); // username already exists
    }

    await usersDao.updateUser(user._id, updatedUserInfo);
    const out = await usersDao.findUserByUsername(updatedUserInfo.username);
    return res.json(out);
  };

  app.get("/api/users/profile/:username", checkUserExistence);
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:username", updateUserInfo);
};
export default AuthController;
