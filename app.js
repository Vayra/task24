const express = require("express");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

let rawData = fs.readFileSync("data.json");
const data = JSON.parse(rawData);

app.use('/html', express.static('html'));
// Handlebars stuff

//Contexts:
let experienceContext = {
    workExperience : data.workExperience
};
let contactContext = {
    name: data.name,
    title: data.title,
    born: data.born,
    phone: data.phone,
    email: data.email,
    residence: data.residence,
    nationality: data.nationality
};

let educationContext = {
    education: data.qualifications
}

// Filenames
let inFile = 'templates/experience-template.hbs'
let outFile = 'html/experience-template.html'

let source = fs.readFileSync(inFile, 'utf8')

let experienceTemplate = handlebars.compile(source) 


let experienceCompiled = experienceTemplate(experienceContext);
fs.writeFileSync(outFile, experienceCompiled)
console.log(experienceCompiled);


app.get("/data", (req, res) => res.send(data));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(process.env.PORT || 8080);
