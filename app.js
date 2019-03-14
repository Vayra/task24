const express = require("express");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;

let rawData = fs.readFileSync("data.json");
const data = JSON.parse(rawData);

// Handlebars stuff
/*
$(function(){
    let experienceTemplate = handlebars.compile($("#experience-template").html());
    let experienceContext = {
        workExperience : data.workExperience
    }
    let experienceCompiled = experienceTemplate(experienceContext);
    $(document.body).append(experienceCompiled);
});
*/

app.get("/data", (req, res) => res.send(data));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(process.env.PORT || 8080);
