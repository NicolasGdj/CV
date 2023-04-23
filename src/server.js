"use strict";

let express = require("express");
let app = express();
const fs = require("fs");
const axios = require("axios");

require("dotenv").config();

const { PORT } = process.env;
const server = require("http").createServer(app);

let bodyParser = require("body-parser");

//Moteur de template
app.set("view engine", "ejs");

// Middleware
app.use("/assets", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const projects = require("./modules/projects");

const experiences = require("./modules/experiences");

const formations = require("./modules/formations");

const competences = require("./modules/competences");

const isProjectUp = async (project) => {
  try {
    const response = await axios.get(project.url);

    if (response.status >= 200 && response.status < 400) {
      return true;
    }
  } catch (error) {}
  return false;
};

app.get("/", async (_, response) => {
  for (const project of projects) {
    project.up = await isProjectUp(project);
  }

  response.render("index", {
    projects: projects,
    experiences: experiences,
    formations: formations,
    competences: competences,
  });
});

server.listen(PORT, () => {
  console.log("Server listening on *:" + PORT);
});
