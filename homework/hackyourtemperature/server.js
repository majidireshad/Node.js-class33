const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());

app.post("/weather", function (req, res) {
  const cityName = req.body.cityName;
  res.send(cityName);
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
