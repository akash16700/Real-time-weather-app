const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityInput;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=83a3d5e1f6debfea94395489c4d5ac96&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>Today tempeature of " +
          city +
          " is " +
          weatherData.main.temp +
          " degree celcius</h1>"
      );
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running  on port 3000");
});
