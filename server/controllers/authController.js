const users = require("../models/users");

let id = 1;

const login = (req, res) => {
  for (let i = 0; i < users.length; i++) {
    if (
      req.body.username === users[i].username &&
      req.body.password === users[i].password
    ) {
      req.session.user.username = req.body.username;
      res.status(200).json(req.session.user);
      return;
    }
  }
  res.status(500).json({ error: "invaild username or password" });
};

const register = (req, res) => {
  const { username, password } = req.body;
  users.push({
    id,
    username,
    password
  });
  id++;
  req.session.user.username = username;
  res.status(200).json(req.session.user);
};

const signout = (req, res) => {
  req.session.destroy();
  res.status(200).json(req.session);
};

const getUser = (req, res) => {
  res.status(200).json(req.session.user);
};

module.exports = {
  login,
  register,
  signout,
  getUser
};
