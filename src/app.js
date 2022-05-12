const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectorypath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handebars engine and views loction
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectorypath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Emin",
    text: "Use this site to get your weather.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Emin",
    about: "Providing some information.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Some helpful information.",
    title: "Help",
    name: "Emin",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (!error) {
        forecast(latitude, longitude, (error, data) => {
          if (error) {
            res.send({
              error,
            });
          } else {
            res.send({
              address,
              location,
              forecast: data,
            });
          }
        });
      } else {
        res.send({
          error,
        });
      }
    });
  } else {
    res.send({
      error: "provide address",
    });
  }
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "you must provide search term",
//     });
//   }

//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "Emin",
    errorMessage: "Could not find help article",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Emin",
    errorMessage: "Error message",
  });
});

app.listen(port, () => {
  console.log("Server is runing on " + port);
});
