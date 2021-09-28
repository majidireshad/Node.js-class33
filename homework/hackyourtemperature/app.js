import { keys } from "./sources/keys.js";
import fetch from "node-fetch";
import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`
    );
    const dataJson = await response.json();
    if (parseInt(dataJson.cod) === 404) {
      res.status(404).json({ weatherText: "City is not found!" });
    } else {
      res.json({
        cityName: dataJson.name,
        temperature: `${dataJson.main.temp}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default app;
