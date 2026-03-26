const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const User = require("./models/user.js");

const app = express();
const PORT = 3000;

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal
app.get("/", async (req, res) => {
  const users = await User.findAll();
  res.render("index", { users });
});

// API CRUD
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(200);
});

app.delete("/users/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

// Banco
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
  });
});