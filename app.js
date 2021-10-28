const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Hamster prepares you for the battlefield!");
});
app.get("/game", (req, res) => {
  res.send("The New Game");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
