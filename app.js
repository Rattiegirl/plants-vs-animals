const express = require('express');
const app = express();
const PORT = 3000;

app.set("view engine", "ejs")

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Hamster prepares you for the battlefield!");
});
app.get("/game", (req, res) => {
  res.send("The New Game");
});
app.get("/exaples/hamster-vs-rose", (req, res) => {
  res.render("hamster-vs-rose");
});
app.get("/welcome", (req, res) => {
  res.send("You found this");
});
app.get("/team", (req, res) => {
  res.send("Train some helpers");
});
app.get("/multiplayer", (req, res) => {
  res.send("No more bots");
});
app.get("/scores", (req, res) => {
  res.send("I shall show my trophies");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
