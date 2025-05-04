"use strict";

let express = require("express");
let app = express();
const fs = require("fs");
const axios = require("axios");
var figlet = require("figlet");

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

let figletResults = {};

async function getFiglet(name) {
  if(name.length > 20) {
    return `${"-".repeat(name.length + 2)}\n ${name} \n${"-".repeat(name.length + 2)}`; 
  }
  if(!figletResults[name]) {
    await figlet(name, function (err, data) {
      if (err) {
        console.log("Unable to generate figlet for project: ", name);
        console.dir(err);
        return
      }
      figletResults[name] = data;
    });
  }
  return figletResults[name];
}

app.get("/shell/", async (_, response) => {
  for (const project of projects) {
    project.up = await isProjectUp(project);
    project.figlet = await getFiglet(project.name);
  }
  for (const experience of experiences) {
    experience.figlet = await getFiglet(experience.name);
  }
  for (const formation of formations) {
    formation.figlet = await getFiglet(formation.name);
  }
  for (const competence of competences) {
    competence.figlet = await getFiglet(competence.name);
    for(const tags of competence.tags) {
      tags.figlet = await getFiglet(tags.name);
    }
  }

  response.render("shell/index", {
    projects: projects,
    experiences: experiences,
    formations: formations,
    competences: competences,
  });
});

server.listen(PORT, () => {
  console.log("Server listening on *:" + PORT);
});
